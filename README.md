# Zoology Agent Starter (Next.js)

A focused zoology Q&A assistant with a clean chat UI, species profiles, and retrieval over a curated animal knowledge base. Built with Next.js and JavaScript.

## Tech Stack
- Next.js (app router), React, TypeScript optional
- Local zoology KB (JSON/Markdown) + simple retrieval
- Minimal state/logging via API routes

## Quick Start
```bash
pnpm install        # or npm/yarn
pnpm dev            # runs Next.js on http://localhost:3000
```
Environment (optional): copy `.env.example` to `.env.local` and fill any keys you add (e.g., `OPENAI_API_KEY` if using an LLM).

## App Structure / Endpoints
- `/` – Single-chat interface (ask animal questions, view structured answers with sources; helpful/not helpful buttons).
- `/api/chat` – Handles Q&A using single- or simple multi-agent logic over the zoology KB.
- `/api/profile` – Generates species profile cards (taxonomy, distribution, diet, behavior, conservation status).
- `/api/log` – Records queries and feedback for prompt refinement.
- `/data/zoology/*` – Curated KB files (static JSON/Markdown); extend here to improve coverage.

## Core Features
- Zoology-focused assistant (biology, behavior, habitats, conservation) grounded in reputable, pre-curated sources.
- Knowledge retrieval over local KB with cited sources (no live web search).
- Species profile generator producing structured cards.
- Basic query logging + feedback buttons (helpful / not helpful).

## Optional Extensions
- Split agents: TaxonomyAgent + EcologyAgent with a RouterAgent.
- Comparison mode: side-by-side traits for two species.
- Simple visualizations (maps/charts) for distribution or trophic level.
- “My Field Notes” to input observations and suggest likely species/behaviors.
- Offline-friendly caching for a fixed species set.

## TODO
- [MUST] Implement single/simple multi-agent zoology QA with grounded sources.
- [MUST] Build the single-chat Next.js UI (no tabs) with formatted answers.
- [MUST] Wire retrieval over the curated KB with visible citations.
- [MUST] Implement species profile card generator endpoint/UI.
- [MUST] Add query logging and feedback buttons.
- [OPTIONAL] Add Taxonomy/Ecology split + RouterAgent.
- [OPTIONAL] Add species comparison mode.
- [OPTIONAL] Add basic visualization components.
- [OPTIONAL] Add “My Field Notes” observation mode.
- [OPTIONAL] Add offline cache for a small fixed species set.
