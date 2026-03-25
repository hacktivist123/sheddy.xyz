import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setThemePreference } from "@/lib/theme";

export function ModeToggle() {
	const toggleTheme = () => {
		const isDark = document.documentElement.classList.contains("dark");
		setThemePreference(isDark ? "light" : "dark");
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="relative h-8 w-8 text-foreground"
			aria-label="Toggle theme"
		>
			<Sun className="h-4 w-4 rotate-0 scale-100 opacity-100 transition dark:-rotate-90 dark:scale-0 dark:opacity-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 opacity-0 transition dark:rotate-0 dark:scale-100 dark:opacity-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
