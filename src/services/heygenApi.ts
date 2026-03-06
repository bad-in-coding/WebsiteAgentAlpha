export type SessionResponse = { sessionId: string; rtcConfig?: RTCConfiguration };
export type OfferResponse = { answerSdp: string };
const BASE = import.meta.env.VITE_API_BASE_URL

export async function createSession(payload: { purpose?: string }): Promise<SessionResponse> {
  const res = await fetch(`${BASE}/api/heygen/session`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('createSession failed');
  return res.json();
}

export async function sendOffer(sessionId: string, sdp: string): Promise<OfferResponse> {
  const res = await fetch(`${BASE}/api/heygen/offer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, sdp }) });
  if (!res.ok) throw new Error('sendOffer failed');
  return res.json();
}

export async function sendCandidate(sessionId: string, candidate: RTCIceCandidateInit) {
  const res = await fetch(`${BASE}/api/heygen/candidate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, candidate }) });
  if (!res.ok) console.warn('sendCandidate failed');
}

export type SendMessageResponse = {
  ok?: boolean;
  reply?: string;
  heygen?: any;
  heygen_error?: string;
};

export async function sendMessage(sessionId: string | null, text: string): Promise<SendMessageResponse> {
  const res = await fetch(`${BASE}/api/heygen/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, text }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '<no body>');
    throw new Error(`sendMessage failed: ${res.status} ${body}`);
  }

  // parse JSON; backend returns e.g. { ok: true, reply: "...", heygen: {...} }
  const data = await res.json().catch(() => ({}));
  return data as SendMessageResponse;
}
export async function speak(heygenSessionId: string | null, text: string) {
  const res = await fetch(`${BASE}/api/heygen/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: heygenSessionId, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`speak failed: ${res.status} ${body}`);
  }
  return res.json();
}
