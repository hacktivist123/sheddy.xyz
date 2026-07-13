import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sharp from "sharp";
import { getOgThemeColors } from "../../../lib/og-theme";

type Props = {
	title: string;
};

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function wrapTitle(
	title: string,
	maxCharsPerLine: number,
	maxLines: number,
): string[] {
	const words = title.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) {
		return ["Untitled"];
	}

	const lines: string[] = [];
	let current = "";

	for (const word of words) {
		const candidate = current ? `${current} ${word}` : word;
		if (candidate.length <= maxCharsPerLine || !current) {
			current = candidate;
			continue;
		}

		lines.push(current);
		current = word;

		if (lines.length === maxLines - 1) {
			break;
		}
	}

	if (lines.length < maxLines && current) {
		lines.push(current);
	}

	if (
		lines.length === maxLines &&
		words.join(" ").length > lines.join(" ").length
	) {
		const lastIndex = lines.length - 1;
		lines[lastIndex] =
			`${lines[lastIndex].slice(0, Math.max(0, maxCharsPerLine - 1)).trimEnd()}…`;
	}

	return lines;
}

function buildSvg(title: string): string {
	const { background, foreground, primary } = getOgThemeColors();
	const lines = wrapTitle(title, 30, 4);

	const titleLines = lines
		.map((line, index) => {
			const y = 240 + index * 74;
			return `<tspan x="96" y="${y}">${escapeXml(line)}</tspan>`;
		})
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accentGradient" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${primary}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${primary}" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${background}"/>
  <rect width="1200" height="630" fill="url(#accentGradient)"/>
  <rect x="60" y="60" width="1080" height="510" rx="28" fill="none" stroke="${primary}" stroke-opacity="0.32" stroke-width="2"/>

  <text x="96" y="130" font-size="28" font-family="Georgia, 'Times New Roman', serif" fill="${foreground}" fill-opacity="0.7">Shedrack Akintayo</text>

  <text x="96" y="240" font-size="64" font-weight="600" font-family="'Zen Kaku Gothic New', 'Helvetica Neue', Arial, sans-serif" fill="${foreground}">
    ${titleLines}
  </text>

  <text x="96" y="540" font-size="24" font-family="'Zen Kaku Gothic New', 'Helvetica Neue', Arial, sans-serif" fill="${foreground}" fill-opacity="0.72">sheddy.xyz/blog</text>
</svg>`;
}

export async function getStaticPaths() {
	const posts = await getCollection("blog", ({ data }) => !data.draft);

	return posts.map((post) => ({
		params: { slug: post.id },
		props: { title: post.data.title satisfies string },
	}));
}

export const GET: APIRoute<Props> = async ({ props }) => {
	const svg = buildSvg(props.title);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
