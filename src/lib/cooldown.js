const COOLDOWN_MS =
  import.meta.env.VITE_DEMO_MODE === "true"
    ? 15 * 1000 // 15 seconds for demo
    : 6 * 60 * 60 * 1000; // 6 hours real mode

export function canConsult() {
  const last = localStorage.getItem("lastConsult");
  if (!last) return true;

  return Date.now() - Number(last) > COOLDOWN_MS;
}

export function markConsulted() {
  localStorage.setItem("lastConsult", Date.now().toString());
}
