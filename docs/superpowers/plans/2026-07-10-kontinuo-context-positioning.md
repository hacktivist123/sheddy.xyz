# Kontinuo Context Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Kontinuo to selected projects, replace unstable text arrows with SVG icons, and ground the homepage/about-page context-engineering narrative in Kontinuo and the updated CV.

**Architecture:** Keep all changes inside the three existing Astro files that already own project data and biography content. Render one static inline SVG from the existing project-card template, so every card gets a consistent icon without hydration or a dependency change. Verify the result through failing-then-passing browser contracts plus Astro check/build.

**Tech Stack:** Astro 7, Tailwind CSS 4, static inline SVG, gstack browse, Yarn 1.

---

## File map

- Modify `src/components/ProjectList.astro`: add the Kontinuo project record and replace the text marker with a decorative SVG.
- Modify `src/pages/index.astro`: revise only the first hero-summary paragraph.
- Modify `src/pages/about.astro`: integrate CV-backed context architecture, documentation, and developer-experience evidence.
- No new production files, dependencies, or test framework.

### Task 1: Capture the missing homepage contracts

**Files:**
- Test: running homepage at `http://127.0.0.1:4321/`

- [ ] **Step 1: Start the existing Astro development server if needed**

Run:

```bash
yarn dev --host 127.0.0.1
```

Expected: Astro reports a local URL on port 4321. Keep the process running for the browser checks.

- [ ] **Step 2: Verify the Kontinuo-card contract fails**

Run:

```bash
$B goto http://127.0.0.1:4321/
$B js "(() => { const section = [...document.querySelectorAll('section')].find((node) => node.querySelector('h2')?.textContent?.trim() === 'Selected Projects'); const links = [...(section?.querySelectorAll('a') ?? [])]; if (!links.some((link) => link.textContent?.includes('Kontinuo') && new URL(link.href).hostname === 'kontinuo.dev')) throw new Error('Kontinuo project card is missing'); return true; })()"
```

Expected: FAIL with `Kontinuo project card is missing`.

- [ ] **Step 3: Verify the SVG-icon contract fails**

Run:

```bash
$B js "(() => { const section = [...document.querySelectorAll('section')].find((node) => node.querySelector('h2')?.textContent?.trim() === 'Selected Projects'); const links = [...(section?.querySelectorAll('a') ?? [])]; if (!links.length || links.some((link) => link.querySelectorAll('svg').length !== 1) || section?.textContent?.includes('↗')) throw new Error('Selected project cards do not use one SVG icon each'); return true; })()"
```

Expected: FAIL with `Selected project cards do not use one SVG icon each`.

### Task 2: Add Kontinuo and stable project icons

**Files:**
- Modify: `src/components/ProjectList.astro:1-50`
- Test: running homepage at `http://127.0.0.1:4321/`

- [ ] **Step 1: Add Kontinuo as the first project record**

Insert this object at the start of `projects`:

```ts
{
	title: "Kontinuo",
	description:
		"A local-first MCP server and CLI for verifiable handoffs between AI coding agents.",
	href: "https://kontinuo.dev",
},
```

- [ ] **Step 2: Replace the literal arrow span with a static SVG icon**

Replace the current marker with:

```astro
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="text-muted-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
    aria-hidden="true"
>
    <path d="M7 7h10v10"></path>
    <path d="M7 17 17 7"></path>
</svg>
```

This is the Lucide `ArrowUpRight` geometry rendered directly by Astro. It remains decorative because the project title supplies each link’s accessible name.

- [ ] **Step 3: Re-run both browser contracts**

Run the two `$B js` commands from Task 1.

Expected: both return `true`; the selected-project section has five links, each with one SVG, and no `↗` text.

### Task 3: Ground the landing summary in Kontinuo

**Files:**
- Modify: `src/pages/index.astro:23-35`
- Test: running homepage at `http://127.0.0.1:4321/`

- [ ] **Step 1: Add a failing browser assertion for the approved summary**

Run:

```bash
$B js "(() => { const copy = document.querySelector('h1')?.parentElement?.textContent ?? ''; if (!copy.includes('context infrastructure for AI coding agents') || !copy.includes('Kontinuo') || !copy.includes('evidence-backed work across tools and sessions')) throw new Error('Approved context-engineering summary is missing'); return true; })()"
```

Expected: FAIL with `Approved context-engineering summary is missing`.

- [ ] **Step 2: Replace only the first hero-summary paragraph**

Use:

```astro
<p>
    I build scalable cloud systems, write technical content that
    developers actually read, and design context infrastructure for AI
    coding agents. With Kontinuo, I built a local-first MCP continuity
    layer that carries evidence-backed work across tools and sessions.
</p>
```

Keep the role line and athlete paragraph unchanged.

- [ ] **Step 3: Re-run the landing-summary assertion**

Expected: returns `true`.

### Task 4: Integrate the CV-backed context architecture narrative

**Files:**
- Modify: `src/pages/about.astro:20-104`
- Test: running about page at `http://127.0.0.1:4321/about`

- [ ] **Step 1: Add a failing browser assertion for the evidence set**

Run:

```bash
$B goto http://127.0.0.1:4321/about
$B js "(() => { const copy = document.querySelector('main')?.textContent ?? document.body.textContent ?? ''; const required = ['Context Architecture & AI Engineering', 'Kontinuo', 'schema-backed checkpoint model', 'agentic-docs', 'implementation pull requests', 'more than eight years']; const missing = required.filter((value) => !copy.includes(value)); if (missing.length) throw new Error('Missing about-page evidence: ' + missing.join(', ')); return true; })()"
```

Expected: FAIL listing all missing evidence.

- [ ] **Step 2: Replace the introductory paragraph**

Use:

```astro
<p class="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-12">
    I work at the intersection of developer experience, cloud-native
    systems, and AI context architecture. Across more than eight years in
    software engineering, DevRel, and technical writing, I have built the
    documentation, tools, and knowledge systems that help developers and
    coding agents understand complex products and act with confidence.
</p>
```

- [ ] **Step 3: Add the context architecture subsection first under “What I Do”**

Use:

```astro
<h3>Context Architecture & AI Engineering</h3>
<ul>
    <li>
        Built <a
            href="https://kontinuo.dev"
            target="_blank"
            rel="noopener noreferrer">Kontinuo</a
        >, a local-first MCP server and CLI for verifiable handoffs
        between AI coding agents
    </li>
    <li>
        Designed its schema-backed checkpoint model to combine explicit
        session intent with Git and workspace evidence, including
        provenance, freshness, drift, and verification state
    </li>
    <li>
        Led Traefik's agentic-docs initiative, restructuring product
        documentation into a high-fidelity, machine-readable context
        layer for RAG and AI coding assistants
    </li>
    <li>
        Built internal Claude tooling that generates codebase
        documentation from implementation pull requests
    </li>
</ul>
```

- [ ] **Step 4: Replace the technical-writing bullets with CV-backed practice**

Use:

```astro
<h3>Technical Writing & Documentation Architecture</h3>
<ul>
    <li>
        Design and maintain documentation systems for cloud-native
        products and open-source communities
    </li>
    <li>
        Create product documentation, tutorials, release notes, and
        enterprise case studies for technical audiences
    </li>
    <li>
        Validate product behavior through source code, API, Kubernetes,
        and configuration reviews before documenting it
    </li>
    <li>
        Build docs-as-code workflows that improve onboarding, adoption,
        and machine retrieval
    </li>
</ul>
```

- [ ] **Step 5: Replace the infrastructure subsection with developer-experience evidence**

Use:

```astro
<h3>Developer Relations & Cloud-Native Experience</h3>
<ul>
    <li>
        Started and scaled the Cloud Foundry Foundation's global DevRel
        program for a community of more than 14,000 developers
    </li>
    <li>
        Produced technical content for developer publications, product
        blogs, and communities serving audiences in the millions
    </li>
    <li>
        Built education and adoption programs across Platform.sh,
        Isovalent/Cisco, and other developer-focused companies
    </li>
    <li>
        Work hands-on with Kubernetes, Go, Docker, Terraform,
        eBPF/Cilium, and CI/CD to explain real product behavior
    </li>
</ul>
```

- [ ] **Step 6: Update the “Let’s Connect” topic paragraph**

Use:

```astro
<p>
    I'm always interested in discussing context architecture for AI
    coding agents, MCP integrations and agentic documentation,
    documentation strategy for complex products, and cloud-native
    developer experience.
</p>
```

Keep Tech Stack, Beyond the Screen, portrait, and contact links unchanged.

- [ ] **Step 7: Re-run the about-page evidence assertion**

Expected: returns `true`.

### Task 5: Verify build, accessibility, and responsive behavior

**Files:**
- Verify: `src/components/ProjectList.astro`
- Verify: `src/pages/index.astro`
- Verify: `src/pages/about.astro`

- [ ] **Step 1: Run Astro diagnostics**

Run:

```bash
yarn astro check
```

Expected: exit 0 with no errors.

- [ ] **Step 2: Run the production build**

Run:

```bash
yarn build
```

Expected: exit 0; `/` and `/about` are generated successfully.

- [ ] **Step 3: Verify desktop homepage state**

Run:

```bash
$B viewport 1440x900
$B goto http://127.0.0.1:4321/
$B js "(() => { const section = [...document.querySelectorAll('section')].find((node) => node.querySelector('h2')?.textContent?.trim() === 'Selected Projects'); const links = [...(section?.querySelectorAll('a') ?? [])]; const kontinuo = links.find((link) => link.textContent?.includes('Kontinuo')); if (links.length !== 5 || !kontinuo || new URL(kontinuo.href).hostname !== 'kontinuo.dev' || links.some((link) => link.querySelectorAll('svg').length !== 1) || section?.textContent?.includes('↗')) throw new Error('Homepage project contract failed'); return { cards: links.length, icons: links.filter((link) => link.querySelector('svg')).length }; })()"
$B console --errors
```

Expected: `{ cards: 5, icons: 5 }` and no console errors.

- [ ] **Step 4: Verify mobile homepage and about-page layout**

Run:

```bash
$B viewport 375x812
$B goto http://127.0.0.1:4321/
$B js "(() => { if (document.documentElement.scrollWidth > window.innerWidth) throw new Error('Homepage has horizontal overflow'); return true; })()"
$B goto http://127.0.0.1:4321/about
$B js "(() => { if (document.documentElement.scrollWidth > window.innerWidth) throw new Error('About page has horizontal overflow'); const heading = [...document.querySelectorAll('h3')].find((node) => node.textContent?.trim() === 'Context Architecture & AI Engineering'); if (!heading) throw new Error('Context architecture heading is missing'); return true; })()"
$B console --errors
```

Expected: all assertions return `true` and no console errors.

- [ ] **Step 5: Review the final diff and commit only the intended files**

Run:

```bash
git diff -- src/components/ProjectList.astro src/pages/index.astro src/pages/about.astro
git add src/components/ProjectList.astro src/pages/index.astro src/pages/about.astro docs/superpowers/plans/2026-07-10-kontinuo-context-positioning.md
git commit -m "feat: add Kontinuo context engineering profile"
```

Expected: the commit includes only the three portfolio files and this implementation plan; pre-existing changes to `.gitignore`, `astro.config.mjs`, `package.json`, `src/components/Header.astro`, `yarn.lock`, and `src/pages/uses.astro` remain untouched.
