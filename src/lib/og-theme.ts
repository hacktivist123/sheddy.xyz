import { readFileSync } from "node:fs";

type ThemeColors = {
	background: string;
	foreground: string;
	primary: string;
};

type Oklch = {
	l: number;
	c: number;
	h: number;
};

const FALLBACK_COLORS: ThemeColors = {
	background: "#f2efe5",
	foreground: "#3b3028",
	primary: "#456c9d",
};

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function linearToSrgb(channel: number): number {
	if (channel <= 0.0031308) {
		return 12.92 * channel;
	}

	return 1.055 * channel ** (1 / 2.4) - 0.055;
}

function oklchToHex({ l, c, h }: Oklch): string {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const lPrime = l + 0.3963377774 * a + 0.2158037573 * b;
	const mPrime = l - 0.1055613458 * a - 0.0638541728 * b;
	const sPrime = l - 0.0894841775 * a - 1.291485548 * b;

	const lCubed = lPrime ** 3;
	const mCubed = mPrime ** 3;
	const sCubed = sPrime ** 3;

	const linearR =
		4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
	const linearG =
		-1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
	const linearB =
		-0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;

	const r = clamp(Math.round(linearToSrgb(clamp(linearR, 0, 1)) * 255), 0, 255);
	const g = clamp(Math.round(linearToSrgb(clamp(linearG, 0, 1)) * 255), 0, 255);
	const bChannel = clamp(
		Math.round(linearToSrgb(clamp(linearB, 0, 1)) * 255),
		0,
		255,
	);

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bChannel
		.toString(16)
		.padStart(2, "0")}`;
}

function parseOklch(value: string): Oklch | null {
	const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
	if (!match) {
		return null;
	}

	return {
		l: Number.parseFloat(match[1]),
		c: Number.parseFloat(match[2]),
		h: Number.parseFloat(match[3]),
	};
}

function readRootCssVariable(css: string, variable: string): string | null {
	const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
	if (!rootMatch) {
		return null;
	}

	const variableRegex = new RegExp(`--${variable}:\\s*([^;]+);`);
	const valueMatch = rootMatch[1].match(variableRegex);
	if (!valueMatch) {
		return null;
	}

	return valueMatch[1].trim();
}

function getCssFromGlobalFile(): string {
	const cssPath = new URL("../styles/global.css", import.meta.url);
	return readFileSync(cssPath, "utf-8");
}

export function getOgThemeColors(): ThemeColors {
	try {
		const css = getCssFromGlobalFile();

		const background = readRootCssVariable(css, "background");
		const foreground = readRootCssVariable(css, "foreground");
		const primary = readRootCssVariable(css, "primary");

		if (!background || !foreground || !primary) {
			return FALLBACK_COLORS;
		}

		const parsedBackground = parseOklch(background);
		const parsedForeground = parseOklch(foreground);
		const parsedPrimary = parseOklch(primary);

		if (!parsedBackground || !parsedForeground || !parsedPrimary) {
			return FALLBACK_COLORS;
		}

		return {
			background: oklchToHex(parsedBackground),
			foreground: oklchToHex(parsedForeground),
			primary: oklchToHex(parsedPrimary),
		};
	} catch {
		return FALLBACK_COLORS;
	}
}
