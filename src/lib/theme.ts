export type ThemePreference = "system" | "light" | "dark";
export type AppliedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "theme:change";

function isThemePreference(value: string | null): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark";
}

export function readThemePreference(): ThemePreference {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemePreference(stored) ? stored : "dark";
	} catch {
		return "dark";
	}
}

export function getSystemTheme(): AppliedTheme {
	if (typeof window === "undefined") {
		return "light";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function resolveTheme(preference: ThemePreference): AppliedTheme {
	return preference === "system" ? getSystemTheme() : preference;
}

export function applyTheme(preference = readThemePreference()): {
	preference: ThemePreference;
	resolvedTheme: AppliedTheme;
} {
	const resolvedTheme = resolveTheme(preference);

	if (typeof document === "undefined") {
		return { preference, resolvedTheme };
	}

	document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
	document.documentElement.dataset.themePreference = preference;
	document.documentElement.style.colorScheme = resolvedTheme;

	return { preference, resolvedTheme };
}

export function setThemePreference(preference: ThemePreference): {
	preference: ThemePreference;
	resolvedTheme: AppliedTheme;
} {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, preference);
	} catch {}

	const state = applyTheme(preference);

	if (typeof window === "undefined") {
		return state;
	}

	window.dispatchEvent(
		new CustomEvent(THEME_CHANGE_EVENT, {
			detail: state,
		}),
	);

	return state;
}

export function syncThemeFromStorage(): {
	preference: ThemePreference;
	resolvedTheme: AppliedTheme;
} {
	return applyTheme(readThemePreference());
}

export function onSystemThemeChange(callback: () => void): () => void {
	if (typeof window === "undefined") {
		return () => {};
	}

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = () => {
		if (readThemePreference() === "system") {
			callback();
		}
	};

	mediaQuery.addEventListener("change", handler);

	return () => {
		mediaQuery.removeEventListener("change", handler);
	};
}
