// @ts-check

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://sheddy.xyz",
	prefetch: {
		prefetchAll: false,
		defaultStrategy: "hover",
	},
	integrations: [react(), mdx({ remarkPlugins: [remarkReadingTime] })],

	vite: {
		plugins: [tailwindcss()],
	},
});
