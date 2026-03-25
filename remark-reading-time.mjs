import { toString as mdastToString } from "mdast-util-to-string";
import readingTime from "reading-time";

export function remarkReadingTime() {
	return (_, file) => {
		const textOnPage = mdastToString(file);
		const stats = readingTime(textOnPage);
		const minutesRead = `${Math.max(1, Math.ceil(stats.minutes))} min read`;

		file.data.astro ??= {};
		file.data.astro.frontmatter ??= {};
		file.data.astro.frontmatter.minutesRead = minutesRead;
	};
}
