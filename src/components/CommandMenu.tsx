import {
	FileText,
	Github,
	Home,
	Laptop,
	Linkedin,
	Moon,
	Sun,
	Twitter,
	User,
} from "lucide-react";
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
		<>
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
							onSelect={() =>
								runCommand(() => (window.location.href = "/blog"))
							}
						>
							<FileText className="mr-2 h-4 w-4" />
							<span>Blog</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() => (window.location.href = "/about"))
							}
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
							<Github className="mr-2 h-4 w-4" />
							<span>GitHub</span>
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									window.open("https://twitter.com/coder_blvck", "_blank"),
								)
							}
						>
							<Twitter className="mr-2 h-4 w-4" />
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
							<Linkedin className="mr-2 h-4 w-4" />
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
		</>
	);
}
