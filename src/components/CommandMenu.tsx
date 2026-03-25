import { FileText, Home, Laptop, Moon, Sun, User } from "lucide-react";
import * as React from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { setThemePreference } from "@/lib/theme";

function GitHubBrandIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.08-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.69.08-.69 1.16.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.19A10.9 10.9 0 0 1 12 6.03a10.9 10.9 0 0 1 2.87.39c2.19-1.5 3.15-1.2 3.15-1.2.63 1.6.24 2.77.12 3.06.74.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.26 5.69.41.36.77 1.06.77 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.2.66.79.55A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
		</svg>
	);
}

function TwitterBrandIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M23 2.999a9.46 9.46 0 0 1-2.828.775A4.932 4.932 0 0 0 22.337 1.1a9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.64 2.16a4.916 4.916 0 0 0 1.523 6.56 4.897 4.897 0 0 1-2.229-.616v.06a4.918 4.918 0 0 0 3.946 4.82 4.996 4.996 0 0 1-1.294.172c-.316 0-.624-.03-.925-.086a4.93 4.93 0 0 0 4.6 3.419A9.867 9.867 0 0 1 .964 18.53 13.92 13.92 0 0 0 8.548 20.75c9.104 0 14.085-7.54 14.085-14.084 0-.214-.005-.428-.014-.64A10.012 10.012 0 0 0 23 2.999Z" />
		</svg>
	);
}

function LinkedInBrandIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.33V8.99h3.42v1.57h.05a3.753 3.753 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.46l-.02 6.29ZM5.34 7.48a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 12.97H3.56V8.99h3.56v11.46ZM22.23 0H1.76A1.74 1.74 0 0 0 0 1.72v20.56A1.74 1.74 0 0 0 1.76 24h20.47A1.75 1.75 0 0 0 24 22.28V1.72A1.75 1.75 0 0 0 22.23 0Z" />
		</svg>
	);
}

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => void) => {
		setOpen(false);
		command();
	}, []);

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem
						onSelect={() => runCommand(() => (window.location.href = "/"))}
					>
						<Home className="mr-2 h-4 w-4" />
						<span>Home</span>
					</CommandItem>
					<CommandItem
						onSelect={() => runCommand(() => (window.location.href = "/blog"))}
					>
						<FileText className="mr-2 h-4 w-4" />
						<span>Blog</span>
					</CommandItem>
					<CommandItem
						onSelect={() => runCommand(() => (window.location.href = "/about"))}
					>
						<User className="mr-2 h-4 w-4" />
						<span>About</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Social">
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open("https://github.com/hacktivist123", "_blank"),
							)
						}
					>
						<GitHubBrandIcon className="mr-2 h-4 w-4" />
						<span>GitHub</span>
					</CommandItem>
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open("https://twitter.com/coder_blvck", "_blank"),
							)
						}
					>
						<TwitterBrandIcon className="mr-2 h-4 w-4" />
						<span>Twitter</span>
					</CommandItem>
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open(
									"https://linkedin.com/in/shedrackakintayo",
									"_blank",
								),
							)
						}
					>
						<LinkedInBrandIcon className="mr-2 h-4 w-4" />
						<span>LinkedIn</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Theme">
					<CommandItem
						onSelect={() =>
							runCommand(() => {
								setThemePreference("system");
							})
						}
					>
						<Laptop className="mr-2 h-4 w-4" />
						<span>System</span>
					</CommandItem>
					<CommandItem
						onSelect={() =>
							runCommand(() => {
								setThemePreference("light");
							})
						}
					>
						<Sun className="mr-2 h-4 w-4" />
						<span>Light</span>
					</CommandItem>
					<CommandItem
						onSelect={() =>
							runCommand(() => {
								setThemePreference("dark");
							})
						}
					>
						<Moon className="mr-2 h-4 w-4" />
						<span>Dark</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
