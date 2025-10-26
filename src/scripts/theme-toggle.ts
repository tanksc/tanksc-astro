type ThemeMode = "light" | "dark" | "auto";

const KEY = "theme-preference";
const root = document.documentElement;
const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;

function applyTheme(mode: ThemeMode): void {
  if (mode === "light" || mode === "dark") {
    root.setAttribute("data-theme", mode);
  } else {
    root.removeAttribute("data-theme");
  }
  updateLabel(mode);
}

function updateLabel(mode: ThemeMode): void {
  if (!btn) return;
  const labels: Record<ThemeMode, string> = {
    dark: "🌙 Dark",
    light: "☀️ Light",
    auto: "🖥️ Auto",
  };
  btn.textContent = labels[mode];
  btn.dataset.mode = mode;
  btn.setAttribute("aria-pressed", mode !== "auto" ? "true" : "false");
}

function getStored(): ThemeMode {
  const value = localStorage.getItem(KEY);
  if (value === "light" || value === "dark" || value === "auto") return value;
  return "auto";
}

function setStored(mode: ThemeMode): void {
  localStorage.setItem(KEY, mode);
}

function next(mode: ThemeMode): ThemeMode {
  if (mode === "auto") return "dark";
  if (mode === "dark") return "light";
  return "auto";
}

export function initThemeToggle(): void {
  const current = getStored();
  applyTheme(current);

  if (btn) {
    btn.addEventListener("click", () => {
      const nextMode = next(getStored());
      setStored(nextMode);
      applyTheme(nextMode);
    });
  }
}

initThemeToggle();
