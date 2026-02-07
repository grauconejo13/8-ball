import { useState } from "react";
import GradientOracle from "./components/GradientOracle";
import { canConsult, markConsulted } from "./lib/cooldown";

export default function App() {
  const [message, setMessage] = useState("Ask your question.");
  const [question, setQuestion] = useState("");

  function handleConsult() {
    if (!canConsult()) {
      setMessage("Take time to sit with the last insight.");
      return;
    }

    // 🔮 Placeholder for AI response
    setMessage("The answer will reveal itself in time.");

    markConsulted();
  }

  return (
    <GradientOracle>
      <div className="w-full max-w-sm px-6 text-center space-y-6">
        <p className="text-sm opacity-80">{message}</p>

        <input
          type="text"
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded bg-neutral-900/60 px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none"
        />

        <button
          onClick={handleConsult}
          className="w-full rounded bg-white/10 py-2 text-sm hover:bg-white/20 transition"
        >
          Consult 8-Ball
        </button>
      </div>
    </GradientOracle>
  );
}
