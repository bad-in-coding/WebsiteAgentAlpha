/* components/HeyGenAvatar.tsx */
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "consent" | "connecting" | "connected" | "error" | "ended";

export default function HeyGenAvatar() {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [connectingError, setConnectingError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Chat UI state
  const [transcript, setTranscript] = useState<Array<{ from: "agent" | "user"; text: string }>>([]);
  const [input, setInput] = useState("");
  const quickReplies = ["File ITR demo", "Track Expenses", "Subscribe to early access"];

  // Consent modal state
  const [showConsent, setShowConsent] = useState(true);

  const pushTranscript = (from: "agent" | "user", text: string) => {
    setTranscript((t) => [...t, { from, text }]);
  };

  // Fetch wrapper with minimal retries
  const fetchWithRetry = async (url: string, opts: RequestInit, attempts = 3, backoffMs = 300) => {
    let lastErr: any = null;
    for (let i = 0; i < attempts; i++) {
      try {
        const resp = await fetch(url, opts);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp;
      } catch (e) {
        lastErr = e;
        // small exponential backoff
        await new Promise((r) => setTimeout(r, backoffMs * Math.pow(2, i)));
      }
    }
    throw lastErr;
  };

  // Initialize local audio (microphone).
  const initLocalAudio = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = s;
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = s;
        localAudioRef.current.play().catch(() => {});
      }
      setMicEnabled(true);
    } catch (err) {
      console.warn("Could not get user media:", err);
      setMicEnabled(false);
    }
  };

  useEffect(() => {
    // cleanup local stream on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      if (pcRef.current) {
        try {
          pcRef.current.close();
        } catch {}
        pcRef.current = null;
      }
    };
  }, []);

  // Ensure resources are cleaned if the user navigates away / closes tab
  useEffect(() => {
    const onUnload = () => {
      if (pcRef.current) {
        try {
          pcRef.current.getSenders().forEach((s) => s.track?.stop());
        } catch {}
        pcRef.current.close();
        pcRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  // Helpers to safely extract sessionId / answerSdp from backend responses
  const extractSessionId = (obj: any): string | undefined => {
    if (!obj) return undefined;
    if (typeof obj.sessionId === "string") return obj.sessionId;
    if (typeof obj.id === "string") return obj.id;
    if (obj.raw) {
      if (typeof obj.raw.sessionId === "string") return obj.raw.sessionId;
      if (typeof obj.raw.id === "string") return obj.raw.id;
      if (obj.raw.data && typeof obj.raw.data.sessionId === "string") return obj.raw.data.sessionId;
    }
    return undefined;
  };

  const extractAnswerSdp = (obj: any): string | undefined => {
    if (!obj) return undefined;
    for (const k of ["answerSdp", "answer_sdp", "sdp", "answer"]) {
      if (typeof obj[k] === "string") return obj[k];
    }
    if (obj.raw) {
      for (const k of ["answerSdp", "answer_sdp", "sdp", "answer"]) {
        if (typeof obj.raw[k] === "string") return obj.raw[k];
      }
      // sometimes nested: raw.data.answer
      if (obj.raw.data && typeof obj.raw.data.sdp === "string") return obj.raw.data.sdp;
    }
    return undefined;
  };

  // WebRTC connect flow
  const startSession = async () => {
    setConnectingError(null);
    setStatus("connecting");

    try {
      // 1) Request a sessionId and optional rtc config from backend
      const sessionResp = await fetchWithRetry(
        "/api/heygen/session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purpose: "discovery-demo" }),
        },
        3
      );
      const sessionJson = await sessionResp.json();
      const sid = extractSessionId(sessionJson);
      if (!sid) {
        // If server returns raw debug object, show it for debugging
        console.error("Could not find sessionId in response", sessionJson);
        throw new Error("Server did not return a sessionId. Check server logs or DEBUG flag.");
      }
      setSessionId(sid);

      const rtcConfig: RTCConfiguration | undefined = sessionJson.rtcConfig ?? sessionJson.raw?.rtcConfig ?? undefined;

      // 2) Create RTCPeerConnection
      const pc = new RTCPeerConnection(rtcConfig ?? { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] });
      pcRef.current = pc;

      // Remote stream handling
      pc.addEventListener("track", (ev) => {
        const el = remoteVideoRef.current;
        if (!el) return;
        if (ev.streams && ev.streams[0]) {
          el.srcObject = ev.streams[0];
          el.play().catch(() => {});
        } else {
          const ms = new MediaStream([ev.track]);
          el.srcObject = ms;
          el.play().catch(() => {});
        }
      });

      pc.addEventListener("connectionstatechange", () => {
        const connState = pc.connectionState;
        if (connState === "connected") {
          setStatus("connected");
          pushTranscript("agent", "Hello! I'm your demo Finance Agent. Ready when you are.");
        } else if (connState === "failed" || connState === "disconnected") {
          setStatus("error");
          setConnectingError(`Connection state: ${connState}`);
        }
      });

      // ICE candidate handling: send to backend as they are discovered
      pc.addEventListener("icecandidate", async (ev) => {
        if (!ev.candidate) return;
        const candidatePayload = ev.candidate?.toJSON ? ev.candidate.toJSON() : ev.candidate;
        try {
          await fetchWithRetry(
            "/api/heygen/candidate",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: sid, candidate: candidatePayload }),
            },
            2,
            200
          );
        } catch (e) {
          console.warn("Failed to send candidate", e);
        }
      });

      // 3) Add local audio track (if available)
      try {
        if (!localStreamRef.current) await initLocalAudio();
        if (localStreamRef.current) {
          for (const track of localStreamRef.current.getAudioTracks()) {
            pc.addTrack(track, localStreamRef.current);
          }
        }
      } catch (e) {
        console.warn("Error adding local track:", e);
      }

      // 4) Create an SDP offer
      const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
      await pc.setLocalDescription(offer);

      // 5) Send our SDP offer to the backend HeyGen signaling endpoint
      const offerResp = await fetchWithRetry(
        "/api/heygen/offer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid, sdp: offer.sdp }),
        },
        3
      );
      const offerJson = await offerResp.json();
      const answerSdp = extractAnswerSdp(offerJson);
      if (!answerSdp) {
        console.error("Could not find answer SDP in offer response", offerJson);
        throw new Error("Server did not return answer SDP. Check server logs or provider response shape.");
      }

      // 6) Apply remote SDP answer
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
      // connectionstatechange listener will update status to connected
    } catch (err: any) {
      console.error(err);
      setConnectingError(err?.message || String(err));
      setStatus("error");
      // cleanup
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    }
  };

  const endSession = async () => {
    setStatus("ended");
    if (pcRef.current) {
      try {
        pcRef.current.getSenders().forEach((s) => s.track?.stop());
      } catch {}
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    setSessionId(null);
    pushTranscript("agent", "Session ended. Thanks for trying the demo!");
  };

  // Chat controls
  const sendMessage = async (text: string) => {
    if (!text) return;
    pushTranscript("user", text);
    setInput("");

    try {
      await fetch("/api/heygen/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text }),
      });
      // The backend might respond with its own reply or push via SSE/websocket. We append a local placeholder.
      pushTranscript("agent", "(demo) I received your request and would show a mock output here.");
    } catch (e) {
      pushTranscript("agent", "(local demo) I received your request.");
    }
  };

  const handleQuickReply = (q: string) => sendMessage(q);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (localStreamRef.current) {
        for (const t of localStreamRef.current.getAudioTracks()) {
          t.enabled = !next;
        }
      }
      return next;
    });
  };

  // UI omitted for brevity in explanation — re-use your existing JSX below (unchanged)
  // ---- Start of your return JSX (copied from your original, unchanged) ----

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-6">
        {/* Left: Avatar + controls */}
        <div className="col-span-7 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <header className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">AgentAlpha — Discovery Avatar</h1>
              <p className="mt-1 text-sm text-slate-500">Interactive onboarding demo · HeyGen Streaming</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  status === "connected" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>
              <button
                onClick={() => {
                  setShowConsent(true);
                }}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Terms
              </button>
            </div>
          </header>

          <div className="mt-6 flex-1 flex flex-col md:flex-row gap-4">
            <div className="flex-1 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-inner p-4 flex flex-col">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-lg font-medium">Live Avatar</h2>
                  <p className="text-xs opacity-80">Low-latency WebRTC stream from HeyGen</p>
                </div>
                <div className="text-xs opacity-80">Session: {sessionId ?? "—"}</div>
              </div>

              <div className="mt-4 flex-1 rounded-lg bg-black/60 overflow-hidden relative">
                <video ref={remoteVideoRef} autoPlay playsInline muted className="w-full h-72 object-cover bg-black" />
                <div className="absolute left-4 bottom-4 bg-white/10 backdrop-blur rounded-full px-3 py-1 text-white text-xs">AgentAlpha</div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (status === "idle" || status === "consent" || status === "ended" || status === "error") {
                      setShowConsent(false);
                      startSession();
                    } else if (status === "connected" || status === "connecting") {
                      endSession();
                    }
                  }}
                  className="rounded-full bg-slate-800 text-white px-4 py-2 font-medium shadow hover:bg-slate-900"
                >
                  {status === "connected" ? "End Session" : "Start Demo"}
                </button>

                <button onClick={toggleMute} className="rounded-full border px-3 py-2 text-sm">
                  {muted ? "Unmute" : "Mute"}
                </button>

                <div className="ml-auto text-sm text-slate-500">Mic: {micEnabled ? "Allowed" : "Blocked"}</div>
              </div>

              <audio ref={localAudioRef} className="hidden" />
            </div>

            <aside className="w-80 bg-white rounded-xl p-4 border">
              <h3 className="text-sm font-semibold text-slate-700">Session Summary</h3>
              <p className="mt-2 text-xs text-slate-500">This demo uses mock data. No files are uploaded.</p>

              <div className="mt-4">
                <h4 className="text-xs font-medium text-slate-600">Suggested Agents</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Finance Agent</span>
                    <span className="text-xs text-slate-400">Recommended</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Notification OS</span>
                    <span className="text-xs text-slate-400">Helpful</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Health Planner</span>
                    <span className="text-xs text-slate-400">Optional</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    pushTranscript("agent", "Opening Finance Agent demo...");
                  }}
                  className="w-full rounded-md bg-gradient-to-r from-amber-400 to-orange-500 text-white py-2 font-semibold shadow"
                >
                  Try Finance Agent Demo
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Right: Chat / Transcript */}
        <div className="col-span-5 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800">Conversation</h2>
          <p className="text-xs text-slate-500 mt-1">Live transcript and quick actions</p>

          <div className="mt-4 flex-1 overflow-auto py-2" style={{ minHeight: 320 }}>
            <div className="space-y-3">
              {transcript.length === 0 && <div className="text-sm text-slate-400">No messages yet. Start the session to see the agent speak.</div>}
              {transcript.map((m, i) => (
                <div key={i} className={`flex ${m.from === "agent" ? "justify-start" : "justify-end"}`}>
                  <div className={`rounded-xl p-3 max-w-[86%] ${m.from === "agent" ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-white"}`}>
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-2 mb-3">
              {quickReplies.map((q) => (
                <button key={q} onClick={() => handleQuickReply(q)} className="text-xs px-3 py-1 rounded-full border text-slate-700">
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
                className="flex-1 rounded-lg border px-3 py-2 focus:outline-none"
                placeholder="Type a message or ask for a demo..."
              />
              <button onClick={() => sendMessage(input)} className="rounded-lg bg-slate-800 text-white px-4 py-2">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      {showConsent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold">AgentAlpha — 30 minute Discovery</h3>
            <p className="mt-2 text-sm text-slate-600">This interactive session will ask a few questions and simulate agent demos. No sensitive documents will be collected during the demo. The session may request microphone access for voice interactions. Shall we begin?</p>

            <div className="mt-4 flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowConsent(false);
                  setStatus("idle");
                }}
                className="px-4 py-2 rounded-md border text-slate-700"
              >
                Not now
              </button>
              <button
                onClick={() => {
                  setShowConsent(false);
                  initLocalAudio();
                  setStatus("consent");
                }}
                className="px-4 py-2 rounded-md bg-slate-800 text-white"
              >
                Yes, start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection error toast */}
      {status === "error" && (
        <div className="fixed right-6 bottom-6 bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded shadow z-50">
          <div className="font-medium">Connection problem</div>
          <div className="text-sm">{connectingError ?? "We could not connect to the avatar service."}</div>
        </div>
      )}
    </div>
  );
}
