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
