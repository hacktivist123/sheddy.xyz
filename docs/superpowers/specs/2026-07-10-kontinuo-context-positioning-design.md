# Kontinuo and Context Engineering Portfolio Design

## Goal

Update the portfolio so selected-project links use stable SVG icons, Kontinuo appears as a featured project, and the landing/about copy presents Shedrack Akintayo as a context architect and context engineer through specific, verifiable work.

## Scope

### Selected projects

- Add Kontinuo as the first item in `src/components/ProjectList.astro`.
- Link the card to `https://kontinuo.dev`.
- Describe it as a local-first MCP server and CLI for verifiable handoffs between AI coding agents.
- Replace the literal `↗` rendered by every selected-project card with one inline Lucide-style `ArrowUpRight` SVG.
- Keep the existing hover translation and color behavior.
- Mark the icon decorative with `aria-hidden="true"`; the project title already supplies the link name.
- Do not add client-side hydration or a new icon dependency.
- Do not change the separate plaintext arrow in the “View all posts” link because the request is scoped to selected-project cards.

### Landing page

- Keep the existing role line unchanged: “Technical Writer · DevRel Engineer · DevOps Solutions Architect.”
- Rewrite only the first personal-summary paragraph.
- Introduce context infrastructure for AI coding agents and name Kontinuo as the concrete example.
- Keep the paragraph short enough to preserve the current hero hierarchy.
- Keep the athlete paragraph unchanged.

### About page

- Rewrite the introductory paragraph around more than eight years across software engineering, DevRel, technical writing, cloud-native systems, and context architecture.
- Add “Context Architecture & AI Engineering” as the first subsection under “What I Do.”
- Ground the subsection in:
  - Kontinuo, a local-first MCP server and CLI for continuity between AI coding agents;
  - a normalized, schema-backed checkpoint model that combines explicit session intent with Git and workspace evidence;
  - provenance, freshness and drift checks, secret redaction, human-readable rendering, and graceful degradation;
  - Traefik’s agentic-docs initiative, which restructured documentation into a machine-readable context layer for RAG and AI coding assistants;
  - internal tooling that generates codebase documentation from implementation pull requests.
- Tighten the existing technical-writing and infrastructure sections around CV-backed experience without turning the page into a chronological resume.
- Preserve the Tech Stack and Beyond the Screen sections.
- Update “Let’s Connect” to include MCP integrations, agentic documentation, and context systems.

## Evidence and wording constraints

Statements must remain supportable by the updated CV and Kontinuo’s public site/docs.

Kontinuo’s public description establishes that it:

- is a local-first continuity layer, MCP server, and CLI;
- captures evidence-backed checkpoints from agent sessions and workspace metadata;
- combines explicit intent with branch, Git HEAD, dirty state, changed files, and a workspace fingerprint;
- stores schema-backed, content-addressed checkpoints and renders human-readable Markdown;
- checks checkpoint freshness, exposes drift, redacts secrets, and falls back to workspace-only capture rather than fabricating intent;
- does not run models, merge code, or send session data off-machine.

The updated CV establishes:

- more than eight years across software engineering, DevOps, technical writing, and DevRel;
- the title “Context Architect”;
- MCP development, RAG context pipelines, and agentic workflows as current skills;
- leadership of Traefik’s agentic-docs initiative;
- development of internal Claude-based documentation-generation tooling;
- experience serving open-source communities and global technical audiences.

Avoid unsupported adoption metrics, customer claims for Kontinuo, or claims that Kontinuo itself performs agent reasoning.

## Implementation structure

- `src/components/ProjectList.astro`: project data and SVG card icon.
- `src/pages/index.astro`: short landing summary only.
- `src/pages/about.astro`: integrated context-engineering narrative and CV-backed supporting copy.
- No new production files or dependencies.

## Behavioral verification

1. Before implementation, use the running site to verify that the homepage has no Kontinuo card and selected-project cards have no SVG icons.
2. Run Astro’s project check and production build after implementation.
3. Inspect the built/running homepage and assert:
   - five selected-project links render;
   - the Kontinuo card links to `https://kontinuo.dev/` or its URL-equivalent;
   - every selected-project card contains one SVG icon and no literal `↗` marker;
   - the revised landing paragraph is visible;
   - the existing role line and athlete paragraph are unchanged.
4. Inspect `/about` and assert that the context architecture subsection, Kontinuo evidence, Traefik agentic-docs evidence, and revised contact topics are visible.
5. Check `/` and `/about` at desktop and 375-pixel mobile widths for overflow, wrapping, icon alignment, and readable hierarchy.
6. Check browser console output for errors on both pages.

## Non-goals

- A standalone Kontinuo case-study page.
- A full CV or employment timeline on the about page.
- Changes to navigation, project-card layout, Tech Stack, or sports copy.
- Replacing unrelated textual arrows elsewhere on the site.
