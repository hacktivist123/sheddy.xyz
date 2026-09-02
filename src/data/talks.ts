
export type TalkKind = "talk" | "stream" | "tutorial" | "conversation";

export interface Talk {
	id: string;
	title: string;
	dek: string;
	event: string;
	date: string;
	seconds: number;
	kind: TalkKind;
	startAt?: number;
	featured?: boolean;
}

export const talks: Talk[] = [
	{
		id: "mJOOu0C9TYQ",
		title: "From Chaos to Control: Streamlining Kubernetes Ingress with Cilium",
		dek: "Why ingress becomes the bottleneck as traffic grows, and how Cilium's Gateway API implementation replaces the sprawl with one control point.",
		event: "Kubernetes Community Days UK",
		date: "2024-10-29",
		seconds: 1306,
		kind: "talk",
		featured: true,
	},
	{
		id: "kbYVykOzkgE",
		title:
			"What Is Going On Within My Network? A Subtle Introduction to Cilium Hubble",
		dek: "A ground-up tour of eBPF-based network observability: what Hubble sees, how it sees it, and what to do with the flows once you have them.",
		event: "CNCF",
		date: "2024-03-28",
		seconds: 2153,
		kind: "talk",
		featured: true,
	},
	{
		id: "m6_4vt8gu8g",
		title: "From Frontend Engineering to Cloud Native: Lessons from a Beginner",
		dek: "A first-hand account of crossing from React into Kubernetes — the successes, the dead ends, and what actually shortened the learning curve.",
		event: "Kubernetes Community Days UK",
		date: "2023-11-01",
		seconds: 1576,
		kind: "talk",
		featured: true,
	},
	{
		id: "_QWKjHGciUc",
		title: "Developer Experience — A Catalyst for Success",
		dek: "Developer experience is the most frequently neglected part of a B2D product, and the one that quietly decides your retention rate.",
		event: "GDG Lagos",
		date: "2023-05-15",
		seconds: 1769,
		kind: "talk",
		featured: true,
	},
	{
		id: "fqXratwshWM",
		title: "OrbStack: A Lightweight Alternative for Docker",
		dek: "A short, practical look at swapping Docker Desktop for OrbStack on macOS, and what you gain in memory and start-up time.",
		event: "Shedrack Akintayo",
		date: "2023-06-26",
		seconds: 141,
		kind: "tutorial",
	},
	{
		id: "AaKXYRUzgEs",
		title: "A Talk with Sheddy",
		dek: "A long conversation with Fortune Ikechi on positioning for remote roles, the STAR interview principle, and relocating as an engineer.",
		event: "Fortune Ikechi",
		date: "2022-11-03",
		seconds: 1860,
		kind: "conversation",
	},
	{
		id: "rjGg4BIeQE0",
		title: "What You Need to Know About Modern JavaScript Build Tools",
		dek: "How build tooling evolved, where the modern generation actually helps, and how to use it to cut what you ship to the browser.",
		event: "LogRocket",
		date: "2022-11-16",
		seconds: 2829,
		kind: "talk",
		featured: true,
	},
	{
		id: "4HAF4dlkLiU",
		title: "Solving the Fixing a Bug Quest",
		dek: "A live debugging session working through Wilco's most popular bug-fixing quest end to end.",
		event: "Wilco",
		date: "2022-11-16",
		seconds: 3340,
		kind: "stream",
	},
	{
		id: "A0pqsr1jkeA",
		title: "JavaScript Tooling: The Great Battle of React Build Tools",
		dek: "Comparing the React build tool landscape on real criteria — speed, configuration cost, and what you actually ship.",
		event: "React Global Online Summit 22.2",
		date: "2022-11-08",
		seconds: 32783,
		kind: "talk",
		startAt: 9532,
	},
	{
		id: "Cj840iKFVlo",
		title: "Solving the Hooks of Change Challenge",
		dek: "Working through Wilco's React Hooks challenge live, reasoning about state and effects as the problem unfolds.",
		event: "Wilco",
		date: "2022-10-27",
		seconds: 3975,
		kind: "stream",
	},
	{
		id: "NgyQEjJ1KYw",
		title: "Approaching Developer Relations in an Open Source Community",
		dek: "What developer relations means when the product is a foundation-governed open source project rather than a company's SaaS.",
		event: "Open Source Community Africa",
		date: "2022-06-02",
		seconds: 994,
		kind: "talk",
	},
	{
		id: "vf3HzK_eMlo",
		title: "Decoupling 101 — Why Decouple, When Not To, Progressive Decoupling",
		dek: "The case for splitting a web application into components, the cases against it, and progressive decoupling as the middle path.",
		event: "Drupalcamp Belgium",
		date: "2022-05-05",
		seconds: 1766,
		kind: "talk",
	},
	{
		id: "1JcGXglAzMg",
		title:
			"Understanding and Approaching Developer Communities in Smaller Regions",
		dek: "How to engage developer communities in regions with fewer resources and opportunities — without treating them as an afterthought.",
		event: "DevRel",
		date: "2022-04-07",
		seconds: 1289,
		kind: "talk",
	},
	{
		id: "m_KwxC4BKCQ",
		title: "The Evolution of Deploying Node on Servers and Platforms",
		dek: "From bare servers to platforms: how Node.js deployment changed, and what each generation of tooling was actually solving.",
		event: "Node Congress 2022",
		date: "2022-02-21",
		seconds: 489,
		kind: "talk",
	},
	{
		id: "9TE8QQF5Q8k",
		title: "Approaching Developer Relations in an Open Source Community",
		dek: "The long-form version of the open source DevRel talk, delivered at All Things Open.",
		event: "All Things Open",
		date: "2021-11-09",
		seconds: 2338,
		kind: "talk",
	},
	{
		id: "p2ixAvYdILM",
		title: "Technical Writing 101",
		dek: "A full introduction to technical writing — audience, structure, and process — originally delivered to the Dev Careers interns.",
		event: "Shedrack Akintayo",
		date: "2021-10-25",
		seconds: 3375,
		kind: "talk",
		featured: true,
	},
	{
		id: "AqlG4j6Hf2I",
		title: "Kickstarting an International Tech Career from Nigeria",
		dek: "Co-hosting a Deploy Friday panel with Samson Goddy and Edidiong Asikpo on building a global tech career from Nigeria.",
		event: "Deploy Friday E72 · Platform.sh",
		date: "2021-09-17",
		seconds: 3625,
		kind: "conversation",
	},
	{
		id: "_DWiU68iTYQ",
		title: "How to Deploy a Node.js Application to Kubernetes with Cloud Foundry",
		dek: "Deploying a Node.js app to Kubernetes with near-zero configuration, using the cf push experience over cf-for-k8s.",
		event: "Cloud Foundry",
		date: "2021-07-29",
		seconds: 327,
		kind: "tutorial",
	},
	{
		id: "QvBhUjm_acU",
		title: "A Subtle Introduction to Portals in React",
		dek: "Rendering children into a DOM node outside the parent's hierarchy — what portals solve, and where they quietly break assumptions.",
		event: "JSCAMP 2021",
		date: "2021-07-26",
		seconds: 1007,
		kind: "talk",
	},
	{
		id: "CrgHXSmc2OY",
		title: "Small Teams Making a Big Impact — GOV.UK PaaS",
		dek: "Hosting the GOV.UK PaaS team on how a small group runs a Cloud Foundry platform for hundreds of government departments.",
		event: "Cloud Foundry",
		date: "2021-06-02",
		seconds: 3990,
		kind: "stream",
	},
	{
		id: "a2zjmMU1nz8",
		title: "Painless Kubernetes with Cloud Foundry",
		dek: "Putting a Cloud Foundry abstraction over Kubernetes so application developers never have to meet the complexity underneath.",
		event: "CNCF",
		date: "2021-06-01",
		seconds: 1674,
		kind: "talk",
	},
	{
		id: "OnCzRxYJCxc",
		title: "Cloud Native Dev-to-Deploy Pipelines with GitHub Actions",
		dek: "An Open Source Friday session with Brian Douglas, wiring a GitHub repo to a Cloud Foundry instance and automating deploys to Kubernetes.",
		event: "GitHub",
		date: "2021-06-01",
		seconds: 1326,
		kind: "stream",
	},
	{
		id: "p2LwdqC83Ak",
		title: "Non-profit Open Source Orgs",
		dek: "A JAMstack Radio episode on how non-profit foundations steward open source projects, and what that changes for developer advocacy.",
		event: "JAMstack Radio, Ep. 78 · Heavybit",
		date: "2021-05-13",
		seconds: 1388,
		kind: "conversation",
	},
	{
		id: "VKSbr9SXxA4",
		title: "Cloud Native CI/CD Pipelines on Kubernetes with Tekton and Paketo",
		dek: "Building pipelines with Tekton and Paketo Buildpacks, with Kashyap Vedurmudi of VMware Tanzu joining as guest.",
		event: "Cloud Foundry",
		date: "2021-04-21",
		seconds: 3545,
		kind: "stream",
	},
	{
		id: "YWc9aIXZ_TY",
		title: "How to Deploy Automatically to Kubernetes with Travis CI",
		dek: "A short walkthrough wiring Travis CI to a Kubernetes cluster running cf-for-k8s, so every commit ships.",
		event: "Cloud Foundry",
		date: "2021-04-10",
		seconds: 470,
		kind: "tutorial",
	},
	{
		id: "p5KfdAsQ9uU",
		title: "Automate Deployments to Kubernetes with CircleCI",
		dek: "Connecting a GitHub codebase to CircleCI and watching each check-in build and update the live application.",
		event: "Cloud Foundry",
		date: "2021-04-10",
		seconds: 461,
		kind: "tutorial",
	},
	{
		id: "s6vFsVzAtq0",
		title: "Kubernetes CI/CD Made Easy with Cloud Foundry",
		dek: "Cutting the complexity out of automated Kubernetes deployment using Travis, Jenkins and CircleCI.",
		event: "Cloud Foundry",
		date: "2021-04-01",
		seconds: 4105,
		kind: "stream",
	},
	{
		id: "f4nYRqMCZa4",
		title: "How to Set Up Simple CI/CD Pipelines That Deploy to Kubernetes",
		dek: "Two approaches to continuous deployment side by side — GitLab Runner and GitHub Actions — both landing on Kubernetes.",
		event: "Cloud Foundry",
		date: "2021-02-26",
		seconds: 3720,
		kind: "stream",
	},
	{
		id: "C82xkgjYXuo",
		title: "JavaScript Apps on Kubernetes, Simplified Using Cloud Foundry",
		dek: "How the shift in computing infrastructure landed on JavaScript developers, and what a PaaS layer gives back to them.",
		event: "Cloud Foundry",
		date: "2021-02-04",
		seconds: 3675,
		kind: "stream",
	},
	{
		id: "r5ywLSOXRS0",
		title: "How to Deploy a Django App to Kubernetes with Cloud Foundry",
		dek: "A quick take on getting a Django application onto a Kubernetes cluster running cf-for-k8s.",
		event: "Cloud Foundry",
		date: "2020-12-11",
		seconds: 283,
		kind: "tutorial",
	},
	{
		id: "qgqdtdEjjSM",
		title: "Meet the New Cloud Foundry Foundation Developer Advocates",
		dek: "A TFiR conversation on what a developer advocate at a foundation actually does for new users and the existing community.",
		event: "TFiR",
		date: "2020-12-11",
		seconds: 892,
		kind: "conversation",
	},
	{
		id: "vgFJahgYwVo",
		title:
			"Understanding and Approaching Developer Communities in Smaller Regions",
		dek: "The DevRel/Asia edition of the talk on building developer communities outside the well-resourced hubs.",
		event: "DevRel/Asia 2020",
		date: "2020-11-18",
		seconds: 1447,
		kind: "talk",
	},
	{
		id: "Npxr2Q5ecGk",
		title: "Deploy a Static Site to Kubernetes with Cloud Foundry",
		dek: "Getting a Gatsby static site onto Kubernetes without touching a manifest.",
		event: "Cloud Foundry",
		date: "2020-11-17",
		seconds: 169,
		kind: "tutorial",
	},
	{
		id: "qvso2fRKRy8",
		title: "How to Deploy a Full Stack Application on Cloud Foundry",
		dek: "Deploying a Node.js and MongoDB application, and binding a database service so the data actually persists.",
		event: "Cloud Foundry",
		date: "2020-10-27",
		seconds: 790,
		kind: "tutorial",
	},
	{
		id: "wP_p9lPnJ_Q",
		title: "DevRel/Asia 2020 Interview",
		dek: "A pre-conference interview on developer relations work and what to expect from the DevRel/Asia session.",
		event: "DevRel/Asia 2020",
		date: "2020-10-24",
		seconds: 848,
		kind: "conversation",
	},
	{
		id: "UIPKR5VjO7M",
		title: "Open Source in Africa",
		dek: "An All Things Open keynote on the state of open source participation across Africa, and what the ecosystem still gets wrong about it.",
		event: "All Things Open (Keynote)",
		date: "2020-10-23",
		seconds: 914,
		kind: "talk",
		featured: true,
	},
	{
		id: "OxJoWy1xF6E",
		title: "Open Source in Africa",
		dek: "The FLOSSK edition of the Open Source in Africa talk, with more room for the community-building detail.",
		event: "FLOSSK",
		date: "2020-10-21",
		seconds: 1688,
		kind: "talk",
	},
	{
		id: "QO0qcjC7luQ",
		title: "Documenting Your Open Source Projects",
		dek: "A GitHub Africa meetup session on what documentation an open source project owes its first-time contributors.",
		event: "GitHub Africa Virtual Meetup",
		date: "2020-10-20",
		seconds: 6050,
		kind: "talk",
		startAt: 3623,
	},
	{
		id: "WBLf5YzVAoQ",
		title: "Cloud Foundry Summit Europe — Virtual Platform Tour",
		dek: "A short guided tour of the Cloud Foundry Summit Europe virtual venue.",
		event: "Cloud Foundry Summit Europe",
		date: "2020-10-18",
		seconds: 358,
		kind: "tutorial",
	},
	{
		id: "_oxTy4yVXYE",
		title: "Developer Advocate at the Cloud Foundry Foundation",
		dek: "An interview tracing the path from college, through software engineering, into developer advocacy and technical writing.",
		event: "Burak",
		date: "2020-08-28",
		seconds: 1121,
		kind: "conversation",
	},
	{
		id: "AIfALNaQncA",
		title:
			"JavaScript Tooling — The Evolution and Future of JS & Front-end Build Tools",
		dek: "Where front-end build tooling came from, why each generation replaced the last, and where it was heading next.",
		event: "GitNation",
		date: "2020-06-25",
		seconds: 631,
		kind: "talk",
	},
];

export const kindLabel: Record<TalkKind, string> = {
	talk: "Talk",
	stream: "Livestream",
	tutorial: "Tutorial",
	conversation: "Conversation",
};

export function formatRuntime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.round((seconds % 3600) / 60);
	return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;
}

export function formatTimestamp(seconds: number): string {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const sec = seconds % 60;
	return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function runtimeLabel(talk: Talk): string {
	return talk.startAt
		? `from ${formatTimestamp(talk.startAt)}`
		: formatRuntime(talk.seconds);
}

export function watchUrl(talk: Talk): string {
	const base = `https://www.youtube.com/watch?v=${talk.id}`;
	return talk.startAt ? `${base}&t=${talk.startAt}s` : base;
}

export function posterUrl(talk: Talk): string {
	return `https://i.ytimg.com/vi/${talk.id}/hqdefault.jpg`;
}

export const talksByDate = [...talks].sort((a, b) =>
	b.date.localeCompare(a.date),
);
