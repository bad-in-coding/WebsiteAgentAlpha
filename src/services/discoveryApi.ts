const BASE = import.meta.env.VITE_API_BASE_URL;
export type StartResp = { session_id: string; first_question: any };
export type QuestionResp = { question: any | null; finished: boolean };
export type AnswerResp = { next_question: any | null; finished: boolean };
export type CompleteResp = {
  session_id: string;
  summary?: string;
  pain_points?: Array<{ category?: string; text?: string }>;
  recommendations?: Array<{ id?: string; label?: string; reason?: string; score?: number }>;
  raw_llm?: any;
};

export async function discoverStart(): Promise<StartResp> {
  const res = await fetch(`${BASE}/discover/start`, { method: "POST" });
  if (!res.ok) throw new Error("discoverStart failed");
  return res.json();
}

export async function discoverQuestion(sessionId: string): Promise<QuestionResp> {
  const res = await fetch(`${BASE}/discover/question?session_id=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error("discoverQuestion failed");
  return res.json();
}

export async function discoverAnswer(sessionId: string, questionId: string, answer: any): Promise<AnswerResp> {
  const res = await fetch(`${BASE}/discover/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, question_id: questionId, answer }),
  });
  if (!res.ok) throw new Error("discoverAnswer failed");
  return res.json();
}

export async function discoverComplete(sessionId: string): Promise<CompleteResp> {
  const res = await fetch(`${BASE}/discover/complete?session_id=${encodeURIComponent(sessionId)}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("discoverComplete failed");
  return res.json();
}

export async function paraphraseQuestion(questionText: string, context?: any, maxWords = 12): Promise<string> {
  const res = await fetch(`${BASE}/discover/paraphrase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question_text: questionText, context: context ?? {}, max_words: maxWords }),
  });
  if (!res.ok) {
    console.warn("paraphrase failed");
    return questionText;
  }
  const data = await res.json();
  return data.paraphrase ?? questionText;
}
