const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours

export function canConsult() {
  const last = localStorage.getItem("lastConsult");
  if (!last) return true;

  return Date.now() - Number(last) > COOLDOWN_MS;
}

export function markConsulted() {
  localStorage.setItem("lastConsult", Date.now().toString());
}
