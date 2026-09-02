import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	onSystemThemeChange,
	setThemePreference,
	THEME_CHANGE_EVENT,
} from "@/lib/theme";

export function ModeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const syncThemeState = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};

		syncThemeState();
		const stopSystemThemeSync = onSystemThemeChange(syncThemeState);
		window.addEventListener(THEME_CHANGE_EVENT, syncThemeState);
		window.addEventListener("storage", syncThemeState);
		document.addEventListener("astro:after-swap", syncThemeState);

		return () => {
			stopSystemThemeSync();
			window.removeEventListener(THEME_CHANGE_EVENT, syncThemeState);
			window.removeEventListener("storage", syncThemeState);
			document.removeEventListener("astro:after-swap", syncThemeState);
		};
	}, []);

	const toggleTheme = () => {
		const nextTheme = document.documentElement.classList.contains("dark")
			? "light"
			: "dark";
		setThemePreference(nextTheme);
		setIsDark(nextTheme === "dark");
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="relative h-9 w-9 rounded-full text-current transition-[transform,color,background-color] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.97]"
			aria-label="Dark theme"
			aria-pressed={isDark}
		>
			<Sun className="h-4 w-4 rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-[160ms] ease-[var(--ease-out)] dark:-rotate-45 dark:scale-[0.94] dark:opacity-0 motion-reduce:rotate-0 motion-reduce:transition-opacity" />
			<Moon className="absolute h-4 w-4 rotate-45 scale-[0.94] opacity-0 transition-[transform,opacity] duration-[160ms] ease-[var(--ease-out)] dark:rotate-0 dark:scale-100 dark:opacity-100 motion-reduce:rotate-0 motion-reduce:transition-opacity" />
		</Button>
	);
}
