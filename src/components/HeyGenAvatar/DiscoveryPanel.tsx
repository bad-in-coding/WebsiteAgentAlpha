// src/components/DiscoveryPanel.tsx
import { useEffect, useState } from "react";
import useDiscovery from "../../hooks/useDiscovery";

type Props = {
  heygenSessionId?: string | null; // pass the active HeyGen session id to speak questions
};

export default function DiscoveryPanel({ heygenSessionId }: Props) {
  const {
    sessionId,
    currentQuestion,
    finished,
    loading,
    error,
    progress,
    summary,
    start,
    answerAndNext,
    skipQuestion,
    complete,
  } = useDiscovery(heygenSessionId);

  const [value, setValue] = useState("");

  useEffect(() => {
    // clear input when question changes
    setValue("");
  }, [currentQuestion]);

  if (!sessionId) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">Discovery — Start</h2>
        <p className="text-sm text-slate-500 mt-2">This 30-min session will ask structured questions about your routines and pain points.</p>
        <button className="mt-4 px-4 py-2 rounded bg-slate-800 text-white" onClick={() => start()}>
          Start Discovery
        </button>
      </div>
    );
  }

  if (finished && summary) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">Personalized Summary</h2>
        <p className="mt-3 text-sm text-slate-700">{summary.summary}</p>

        <h3 className="mt-4 font-semibold">Top Pain Points</h3>
        <ul className="list-disc pl-6 mt-2">
          {(summary.pain_points || []).map((p: any, i: number) => (
            <li key={i} className="text-sm text-slate-700">{p.category ? `${p.category}: ` : ""}{p.text}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Recommended Agents</h3>
        <div className="mt-2 space-y-2">
          {(summary.recommendations || []).map((r: any, i: number) => (
            <div key={i} className="p-3 border rounded-md flex items-center justify-between">
              <div>
                <div className="font-medium">{r.label ?? r.id}</div>
                <div className="text-xs text-slate-500">{r.reason}</div>
              </div>
              <button className="px-3 py-1 rounded bg-amber-400 text-white">Try Demo</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Discovery</h2>
        <div className="text-sm text-slate-500">{progress.index}/{progress.total}</div>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {currentQuestion ? (
        <div className="mt-4">
          <div className="text-md font-medium">{currentQuestion.text}</div>

          {currentQuestion.type === "choice" && Array.isArray(currentQuestion.choices) ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {currentQuestion.choices.map((c: string) => (
                <button key={c} onClick={() => answerAndNext(currentQuestion.id, c)} className="px-3 py-1 border rounded text-sm">
                  {c}
                </button>
              ))}
            </div>
          ) : currentQuestion.type === "time_allocation" ? (
            <div className="mt-3">
              <input
                placeholder="work=9,family=2,fitness=1,meals=2,finance=0.5,sleep=7.5"
                className="w-full px-3 py-2 border rounded"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 rounded bg-slate-800 text-white" onClick={() => answerAndNext(currentQuestion.id, value)}>
                  Next
                </button>
                <button className="px-3 py-1 rounded border" onClick={() => skipQuestion()}>
                  Skip
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Type your answer..." />
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 rounded bg-slate-800 text-white" onClick={() => answerAndNext(currentQuestion.id, value)}>
                  Next
                </button>
                <button className="px-3 py-1 rounded border" onClick={() => skipQuestion()}>
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 text-sm text-slate-500">No active question — finishing up...</div>
      )}

      <div className="mt-6">
        <button className="px-3 py-1 rounded border text-sm" onClick={() => complete(sessionId || undefined)} disabled={loading}>
          Finish & Summarize
        </button>
      </div>
    </div>
  );
}
