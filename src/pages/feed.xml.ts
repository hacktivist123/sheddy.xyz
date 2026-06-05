import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: "Shedrack Akintayo Blog",
		description:
			"Thoughts on DevOps, cloud architecture, and technical writing.",
		site: context.site ?? "https://sheddy.xyz",
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.summary,
			link: `/blog/${post.id}/`,
			categories: post.data.tags,
		})),
		customData: "<language>en-us</language>",
	});
};
