import { useRef, useState, useCallback } from 'react';
import StreamingAvatar, { 
  AvatarQuality, 
  StreamingEvents, 
  TaskType 
} from '@heygen/streaming-avatar';

export default function useHeyGenRTC() {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  
  const [transcript, setTranscript] = useState<{ from: 'agent' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [phase2Unlocked, setPhase2Unlocked] = useState(false);

  const mediaStreamRef = useRef<HTMLVideoElement>(null);

  const fetchAccessToken = async () => {
    const res = await fetch("http://localhost:8000/api/heygen/token", { method: "POST" });
    const data = await res.json();
    return data.token;
  };

  const startSession = useCallback(async () => {
    setStatus('connecting');
    try {
      const token = await fetchAccessToken();
      const newAvatar = new StreamingAvatar({ token });
      setAvatar(newAvatar);

      // --- AUDIO FIX IS HERE ---
      newAvatar.on(StreamingEvents.STREAM_READY, (event) => {
        if (mediaStreamRef.current && event.detail) {
          mediaStreamRef.current.srcObject = event.detail;
          
          // FORCE BROWSER TO UNMUTE
          mediaStreamRef.current.muted = false;
          mediaStreamRef.current.volume = 1.0;
          
          mediaStreamRef.current.onloadedmetadata = () => {
            mediaStreamRef.current?.play().catch((e) => {
              console.error("Autoplay failed. User interaction needed.", e);
            });
          };
        }
        setStatus('connected');
      });
      // -------------------------

      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        setStatus('ended');
      });

      const data = await newAvatar.createStartAvatar({
        quality: AvatarQuality.Medium,
        // Use a known public ID if your custom one fails, otherwise use yours
        avatarName: "Wayne_20240711", 
        language: "English",
      });
      setSessionId(data.session_id);

      // Trigger the first question
      await sendMessageInternal(data.session_id, "START_SESSION", newAvatar, true);
      // setTimeout(async () => {
      //   setStatus('connected');
      //   setSessionId('mock-session-id'); // Fake ID
      //   // Trigger the intro manually without an avatar instance
      //   await sendMessageInternal('mock-session-id', "START_SESSION", null as any, true);
      // }, 1000);

    } catch (e) {
      console.error("Start Session Failed:", e);
      setStatus('idle');
    }
  }, []);

  const sendMessageInternal = async (sid: string, text: string, avatarInstance: StreamingAvatar, hidden: boolean = false) => {
    if (!hidden) {
      setTranscript(prev => [...prev, { from: 'user', text }]);
      setInput('');
    }

    try {
      const res = await fetch("http://localhost:8000/api/chat/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid, text })
      });
      
      const data = await res.json();
      console.log("BACKEND RESPONSE:", data);

      if (!data.text || typeof data.text !== 'string') {
        console.error("Invalid text format received from backend:", data);
        return;
      }

      setTranscript(prev => [...prev, { from: 'agent', text: data.display }]);

      await avatarInstance.speak({ 
        text: data.text, 
        taskType: TaskType.REPEAT 
      });

      if (data.completed === true) {
        console.log("PHASE 2 UNLOCKED!");
        setPhase2Unlocked(true);
      }

    } catch (e) {
      console.error("Chat Error:", e);
    }
  };

  const sendMessage = (text: string) => {
    if (avatar && sessionId) sendMessageInternal(sessionId, text, avatar);
    // if (sessionId) {
    //     sendMessageInternal(sessionId, text, avatar as any);
    // }
  };

  const endSession = async () => {
    if (avatar) {
      try {
        await avatar.stopAvatar();
      } catch (e) {
        console.warn("Failed to stop avatar:", e);
      }
    }
    setAvatar(null);
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
    phase2Unlocked
  };
}