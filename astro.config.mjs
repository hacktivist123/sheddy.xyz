// @ts-check

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://www.sheddy.xyz",
	markdown: {
		processor: unified({ remarkPlugins: [remarkReadingTime] }),
	},
	prefetch: {
		prefetchAll: false,
		defaultStrategy: "hover",
	},
	integrations: [react(), mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
});
