import { useState } from "react";
import GradientOracle from "./components/GradientOracle";
import { consultOracle } from "./lib/ai";
import {
  canConsult,
  markConsulted,
  getRemainingConsults,
  getCooldownRemaining,
  resetCooldown,
} from "./lib/cooldown";

export default function App() {
  const [message, setMessage] = useState("Ask your question.");
  const [question, setQuestion] = useState("");

  async function handleConsult() {
    if (!canConsult()) {
      setMessage("Take time to sit with the last insight.");
      return;
    }

    if (!question.trim()) {
      setMessage("Ask a clear question.");
      return;
    }

    setMessage("Listening…");

    try {
      const result = await consultOracle(question);
      setMessage(result);
      markConsulted();
      setQuestion("");
    } catch {
      setMessage("The signal is unclear right now.");
    }
  }

  function handleReset() {
    resetCooldown();
    setMessage("Ask your question.");
    setQuestion("");
  }

  return (
    <GradientOracle>
      <div className="w-full max-w-sm px-6 text-center space-y-6 font-oracle">
        {/* Demo-only reset */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="text-xs uppercase tracking-widest text-neutral-400/60 hover:text-neutral-300 transition"
          >
            Demo Reset
          </button>
        </div>

        <p className="text-lg opacity-80 tracking-wide">{message}</p>

        <div className="relative">
          <input
            type="text"
            placeholder="ask the 8-ball"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="
              w-full bg-transparent text-center text-xl tracking-widest
              text-neutral-100 placeholder-neutral-500
              border-b border-white/20
              pb-2
              focus:outline-none focus:border-white/50
              transition
            "
          />
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-white/10 blur" />
        </div>

        <button
          onClick={handleConsult}
          className="
            mt-2 px-6 py-2
            text-sm tracking-widest uppercase
            bg-white/5 hover:bg-white/15
            rounded
            transition
          "
        >
          Consult
        </button>

        {/* Muted usage indicator */}
        <p className="text-xs tracking-wide text-neutral-400/60">
          {canConsult()
            ? `${getRemainingConsults()} consultations remaining`
            : `Available again in ${getCooldownRemaining()} min`}
        </p>
      </div>
    </GradientOracle>
  );
}
