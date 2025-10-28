type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";
const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const LABELS: Record<ThemeMode, string> = {
  dark: "Switch to dark mode",
  light: "Switch to light mode",
};

const opposite = (mode: ThemeMode): ThemeMode => (mode === "dark" ? "light" : "dark");

function persist(mode: ThemeMode): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, mode);
  } catch (_err) {
    // storage can fail in private mode; ignore
  }
}

function updateToggle(nextMode: ThemeMode): void {
  if (!toggle) return;
  const label = LABELS[nextMode];
  toggle.dataset.mode = nextMode;
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("title", label);
}

function setTheme(mode: ThemeMode): void {
  root.setAttribute("data-theme", mode);
  persist(mode);
  updateToggle(opposite(mode));
}

function readStored(): ThemeMode | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (_err) {
    // ignore storage access errors
  }
  return null;
}

function getInitialMode(): ThemeMode {
  return readStored() ?? (prefersDark.matches ? "dark" : "light");
}

export function initThemeToggle(): void {
  const initialMode = getInitialMode();
  setTheme(initialMode);

  toggle?.addEventListener("click", () => {
    const target = toggle.dataset.mode === "dark" ? "dark" : "light";
    setTheme(target);
  });
}

initThemeToggle();
