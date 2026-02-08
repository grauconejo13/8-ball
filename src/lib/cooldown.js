const MAX_CONSULTS = 3;
const COOLDOWN_MINUTES = 5;

export function canConsult() {
  const used = Number(localStorage.getItem("consultCount") || 0);
  const unlockAt = Number(localStorage.getItem("unlockAt") || 0);

  if (Date.now() < unlockAt) return false;
  return used < MAX_CONSULTS;
}

export function markConsulted() {
  const used = Number(localStorage.getItem("consultCount") || 0) + 1;
  localStorage.setItem("consultCount", used);

  if (used >= MAX_CONSULTS) {
    const unlockTime = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
    localStorage.setItem("unlockAt", unlockTime);
    localStorage.setItem("consultCount", 0);
  }
}

export function getRemainingConsults() {
  const used = Number(localStorage.getItem("consultCount") || 0);
  return Math.max(0, MAX_CONSULTS - used);
}

export function getCooldownRemaining() {
  const unlockAt = Number(localStorage.getItem("unlockAt") || 0);
  const diff = unlockAt - Date.now();

  if (diff <= 0) return 0;
  return Math.ceil(diff / 60000);
}

// 🔁 Demo-only reset
export function resetCooldown() {
  localStorage.removeItem("consultCount");
  localStorage.removeItem("unlockAt");
}
