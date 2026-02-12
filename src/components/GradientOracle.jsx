export default function GradientOracle({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-wave" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center text-neutral-100">
        {children}
      </div>
    </div>
  );
}
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export default function GradientOracle({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-wave" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-neutral-100">
        
        {DEMO_MODE && (
          <div className="mb-6 rounded-lg border border-yellow-400/30 bg-black/40 px-4 py-2 text-sm text-yellow-300 backdrop-blur-sm">
            Demo Mode — Live AI Disabled
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
