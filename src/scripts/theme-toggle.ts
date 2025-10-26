type ThemeMode = "light" | "dark";

const KEY = "theme-mode";
const root = document.documentElement;
const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(mode: ThemeMode): void {
  root.setAttribute("data-theme", mode);
  updateLabel(mode);
  try {
    sessionStorage.setItem(KEY, mode);
  } catch (_err) {
    // ignore when storage is unavailable
  }
}

function updateLabel(currentMode: ThemeMode): void {
  if (!btn) return;
  const targetMode = currentMode === "dark" ? "light" : "dark";
  const labels: Record<ThemeMode, string> = {
    dark: "🌙 Switch to dark mode",
    light: "☀️ Switch to light mode",
  };
  btn.textContent = labels[targetMode];
  btn.setAttribute("aria-label", labels[targetMode]);
  btn.dataset.mode = targetMode;
}

function readStored(): ThemeMode | null {
  try {
    const value = sessionStorage.getItem(KEY);
    if (value === "light" || value === "dark") return value;
  } catch (_err) {
    // ignore
  }
  return null;
}

function initialMode(): ThemeMode {
  return readStored() ?? (prefersDark.matches ? "dark" : "light");
}

export function initThemeToggle(): void {
  let currentMode: ThemeMode = initialMode();
  setTheme(currentMode);

  btn?.addEventListener("click", () => {
    currentMode = currentMode === "dark" ? "light" : "dark";
    setTheme(currentMode);
  });
}

initThemeToggle();
