import { useState } from "react";
import GradientOracle from "./components/GradientOracle";
import { consultOracle } from "./lib/ai";
import { canConsult, markConsulted } from "./lib/cooldown";

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
    } catch {
      setMessage("The signal is unclear right now.");
    }
  }

  return (
    <GradientOracle>
      <div className="w-full max-w-sm px-6 text-center space-y-8 font-oracle">
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

          {/* subtle glow */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-white/10 blur" />
        </div>

        <button
          onClick={handleConsult}
          className="
      mt-4 px-6 py-2
      text-sm tracking-widest uppercase
      bg-white/5 hover:bg-white/15
      rounded
      transition
    "
        >
          Consult
        </button>
      </div>
    </GradientOracle>
  );
}
