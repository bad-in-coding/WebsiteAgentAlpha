import { useRef, useState, useCallback, useEffect } from 'react';
import { Room, RoomEvent, Track, RemoteTrack, RemoteTrackPublication, RemoteParticipant } from 'livekit-client';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export default function useLiveAvatarRTC() {
  const [room, setRoom] = useState<Room | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');

  const [transcript, setTranscript] = useState<{ from: 'agent' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [phase2Unlocked, setPhase2Unlocked] = useState(false);

  const mediaStreamRef = useRef<HTMLVideoElement>(null);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Refs so closures inside sendMessageInternal always access the latest values
  const roomRef = useRef<Room | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, []);

  /**
   * Sends an avatar.speak_text command over the LiveKit agent-control data channel.
   * This is how FULL mode avatars are instructed to speak specific text.
   */
  const sendSpeakCommand = useCallback(async (text: string, sid: string, liveKitRoom: Room) => {
    try {
      const payload = JSON.stringify({
        event_type: 'avatar.speak_text',
        session_id: sid,
        data: { text },
      });
      const encoder = new TextEncoder();
      await liveKitRoom.localParticipant.publishData(encoder.encode(payload), {
        topic: 'agent-control',
        reliable: true,
      });
      console.log('[LiveAvatar] speak_text sent:', text.slice(0, 80));
    } catch (e) {
      console.error('[LiveAvatar] Failed to send speak command:', e);
    }
  }, []);

  /**
   * Step 1: Get a session token from our backend (which calls LiveAvatar API)
   * Step 2: Start the session to get LiveKit credentials
   * Step 3: Connect to the LiveKit room
   */
  const startSession = useCallback(async () => {
    setStatus('connecting');
    try {
      // 1. Create session token
      const tokenRes = await fetch(`${API_BASE}/liveavatar/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!tokenRes.ok) throw new Error('Failed to create session token');
      const tokenData = await tokenRes.json();
      const token = tokenData.token as string;
      setSessionToken(token);
      setSessionId(tokenData.session_id); // session_id is known from the token stage

      // 2. Start session → get LiveKit URL + client token
      const startRes = await fetch(`${API_BASE}/liveavatar/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_token: token }),
      });
      if (!startRes.ok) throw new Error('Failed to start LiveAvatar session');
      const startData = await startRes.json();

      const { session_id, livekit_url, livekit_client_token } = startData;
      // Confirm session_id (should match, but start response is authoritative)
      setSessionId(session_id);

      if (!livekit_url || !livekit_client_token) {
        throw new Error('Missing LiveKit credentials from start response');
      }

      // 3. Connect to LiveKit room
      const newRoom = new Room();
      setRoom(newRoom);
      roomRef.current = newRoom;

      // Listen for the avatar's video track
      newRoom.on(RoomEvent.TrackSubscribed, (
        track: RemoteTrack,
        _publication: RemoteTrackPublication,
        _participant: RemoteParticipant
      ) => {
        if (track.kind === Track.Kind.Video) {
          // Attach video track to the <video> element
          const element = track.attach();
          if (mediaStreamRef.current) {
            // Use the MediaStream from the attached element
            mediaStreamRef.current.srcObject = (element as HTMLVideoElement).srcObject;
            mediaStreamRef.current.muted = false;
            mediaStreamRef.current.volume = 1.0;
            mediaStreamRef.current.play().catch((e) => {
              console.error('Autoplay failed:', e);
            });
          }
        } else if (track.kind === Track.Kind.Audio) {
          // Attach audio track so we can hear the avatar
          track.attach();
        }
      });

      newRoom.on(RoomEvent.Disconnected, () => {
        setStatus('ended');
      });

      await newRoom.connect(livekit_url, livekit_client_token);
      setStatus('connected');
      sessionIdRef.current = session_id;

      // 4. Set up keep-alive interval (every 30s)
      keepAliveRef.current = setInterval(async () => {
        try {
          await fetch(`${API_BASE}/liveavatar/keep-alive`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_token: token }),
          });
        } catch (e) {
          console.warn('Keep-alive failed:', e);
        }
      }, 30000);

      // 5. Trigger the first discovery turn
      await sendMessageInternal(session_id, 'START_SESSION', true);

    } catch (e) {
      console.error('Start Session Failed:', e);
      setStatus('idle');
    }
  }, []);

  /**
   * Send a message to the Discovery Engine via our backend chat endpoint.
   * The avatar speaks natively via LiveAvatar's pipeline.
   */
  const sendMessageInternal = async (sid: string, text: string, hidden: boolean = false) => {
    if (!hidden) {
      setTranscript(prev => [...prev, { from: 'user', text }]);
      setInput('');
    }

    try {
      const res = await fetch(`${API_BASE}/liveavatar/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sid,
          text,
          language_code: 'en-IN',
        }),
      });

      const data = await res.json();
      console.log('BACKEND RESPONSE:', data);

      if (data.reply) {
        setTranscript(prev => [...prev, { from: 'agent', text: data.reply }]);
        // ✅ Make the avatar speak the Discovery Engine's response
        if (roomRef.current && sid) {
          await sendSpeakCommand(data.reply, sid, roomRef.current);
        }
      }

      if (data.completed === true) {
        console.log('PHASE 2 UNLOCKED!');
        setPhase2Unlocked(true);
      }
    } catch (e) {
      console.error('Chat Error:', e);
    }
  };

  const sendMessage = (text: string) => {
    if (sessionId) sendMessageInternal(sessionId, text);
  };

  const endSession = async () => {
    // Stop keep-alive
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }

    // Disconnect LiveKit room
    if (room) {
      try {
        room.disconnect();
      } catch (e) {
        console.warn('Failed to disconnect room:', e);
      }
    }

    // Tell backend to stop the session
    if (sessionToken) {
      try {
        await fetch(`${API_BASE}/liveavatar/stop`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_token: sessionToken,
            reason: 'USER_CLOSED',
          }),
        });
      } catch (e) {
        console.warn('Failed to stop session:', e);
      }
    }

    setRoom(null);
    setSessionId(null);
    setSessionToken(null);
    setStatus('ended');
  };

  return {
    mediaStreamRef,
    status,
    transcript,
    input,
    setInput,
    sendMessage,
    startSession,
    endSession,
    phase2Unlocked,
  };
}
