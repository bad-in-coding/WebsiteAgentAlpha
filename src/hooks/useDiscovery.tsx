// src/hooks/useDiscovery.tsx
import { useCallback, useState } from "react";
import * as api from "../services/discoveryApi";
import * as heygen from "../services/heygenApi";

export type Question = {
  id: string;
  text: string;
  type: string; // choice | text | time_allocation
  choices?: string[];
};

export default function useDiscovery(heygenSessionId?: string | null) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ index: 0, total: 0 });
  const [summary, setSummary] = useState<any | null>(null);

  // Start discovery: create session and load first question
  const start = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const startResp = await api.discoverStart();
      setSessionId(startResp.session_id);
      const q = startResp.first_question;
      setCurrentQuestion(q ?? null);
      setProgress({ index: 1, total: 12 }); // approximate total (could be derived from question list if exposed)
      // paraphrase & speak
      if (q && heygenSessionId) {
        try {
          const speakText = await api.paraphraseQuestion(q.text, { answers });
          await heygen.speak(heygenSessionId, speakText);
        } catch (e) {
          console.warn("speak/paraphrase error", e);
        }
      }
    } catch (e: any) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [heygenSessionId]);

  // Load next question (poll style)
  const pollNextQuestion = useCallback(
    async (sid: string) => {
      try {
        const qresp = await api.discoverQuestion(sid);
        setCurrentQuestion(qresp.question ?? null);
        setFinished(qresp.finished);
      } catch (e) {
        console.warn("pollNextQuestion failed", e);
      }
    },
    []
  );

  // Send answer for current question and advance
  const answerAndNext = useCallback(
    async (questionId: string, answerValue: any) => {
      if (!sessionId) throw new Error("No discovery session");
      setLoading(true);
      setError(null);
      try {
        // persist locally
        setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
        const resp = await api.discoverAnswer(sessionId, questionId, answerValue);
        if (resp.finished) {
          setFinished(true);
          setCurrentQuestion(null);
        } else {
          setCurrentQuestion(resp.next_question ?? null);
        }

        // update progress heuristically (we don't know total exactly)
        setProgress((p) => ({ index: p.index + 1, total: Math.max(p.total, p.index + 1) }));

        // If new question arrived, paraphrase & speak it
        const nextQ = resp.next_question;
        if (nextQ && heygenSessionId) {
          try {
            const speakText = await api.paraphraseQuestion(nextQ.text, { answers: { ...answers, [questionId]: answerValue } });
            await heygen.speak(heygenSessionId, speakText);
          } catch (e) {
            console.warn("paraphrase/speak failed", e);
          }
        }
      } catch (e: any) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    },
    [sessionId, heygenSessionId, answers]
  );

  // Complete synthesis
  const complete = useCallback(
    async (sid?: string) => {
      const s = sid ?? sessionId;
      if (!s) throw new Error("No session id");
      setLoading(true);
      try {
        const comp = await api.discoverComplete(s);
        setSummary(comp);
        // optionally instruct avatar to speak a 1-line summary
        if (heygenSessionId && comp.summary) {
          try {
            await heygen.speak(heygenSessionId, comp.summary);
          } catch (e) {
            console.warn("speak summary failed", e);
          }
        }
      } catch (e: any) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    },
    [sessionId, heygenSessionId]
  );

  // helper: skip question
  const skipQuestion = useCallback(async () => {
    if (!currentQuestion) return;
    await answerAndNext(currentQuestion.id, "__SKIPPED__");
  }, [currentQuestion, answerAndNext]);

  return {
    // state
    sessionId,
    currentQuestion,
    finished,
    loading,
    error,
    progress,
    summary,
    answers,
    // actions
    start,
    pollNextQuestion,
    answerAndNext,
    skipQuestion,
    complete,
  } as const;
}
