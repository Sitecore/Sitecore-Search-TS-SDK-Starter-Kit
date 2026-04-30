# Sitecore Search Starter Kit

**Service:** sitecore-search-starter-kit  
**Product Owner:** <!-- [TODO:Q1] Not found in repo — add GitHub handle -->  
**Architect:** <!-- [TODO:Q2] Not found in repo — add GitHub handle -->  
**JIRA:** <!-- [TODO:Q3] Add Jira board link -->  
**Last Updated:** 2026-04-30  
**Lifecycle:** Production  
**Type:** Frontend (React SPA)

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [Overview](#overview)
- [Architecture](#architecture)
- [Pages & Routing](#pages--routing)
- [Widgets](#widgets)
- [Data Model](#data-model)
- [CEC Configuration Requirements](#cec-configuration-requirements)
- [Internationalization](#internationalization)
- [Event Tracking](#event-tracking)
- [Non-Functional Requirements](#non-functional-requirements)
- [Local Development](#local-development)
- [Known Issues & Limitations](#known-issues--limitations)

---

## Quick Reference

A reference implementation (starter kit) of a content search website built with **React 18** and the **Sitecore Search JS SDK**. Demonstrates end-to-end integration with Sitecore Search services, including event tracking, faceted search, preview search, article detail pages, and multi-language support.

- **Demo:** https://developers.sitecorecloud.io/search-sdk/react/website
- **SDK docs:** https://developers.sitecorecloud.io/search-sdk/
- **Runtime:** Node.js LTS, Vite dev server on `http://localhost:5174`
- **Auth:** API key + customer key passed as Vite environment variables (no user auth)
- **Data sensitivity:** No PII stored; content catalog data served from Sitecore Search APIs

---

## Overview

### Purpose

This starter kit provides a working example of how to integrate the Sitecore Search JS SDK into a React application. It is intended as:

- A **reference implementation** for developers building search experiences on Sitecore Search
- A **demo application** used in SDK documentation
- A **starting point** teams can fork and customize for their own search UIs

### Consumers

- Sitecore developer community (internal and external)
- SDK documentation website (embeds demo link)
- Teams evaluating or onboarding to Sitecore Search

### Key Behaviors

- Renders a multi-page content website backed entirely by Sitecore Search APIs
- Supports full-text search with facet filtering, sorting, and pagination
- Provides a preview/typeahead search experience in the global header
- Displays article detail pages fetched via Search API filter
- Tracks page and interaction events (clicks, navigation) back to Sitecore Search
- Supports locale switching across 8 languages (content language filter)

---

## Architecture

### System Context

```
Browser (React SPA)
    │
    ├── WidgetsProvider (@sitecore-search/react)
    │       └── Connects to Sitecore Search API (cloud)
    │               Auth: customerKey + apiKey
    │
    └── React Router (BrowserRouter)
            ├── / → Home page
            ├── /search → Search Results page
            └── /detail/:id → Article Detail page
```

### System Interactions

| Direction | System | Protocol | Purpose |
|-----------|--------|----------|---------|
| Outbound | Sitecore Search API | HTTPS/REST | Fetch search results, preview suggestions, article detail |
| Outbound | Sitecore Search API | HTTPS/REST | Send event tracking data (clicks, page views) |
| Static | Sitecore CEC (config) | n/a | Widget IDs, suggestion blocks, sorting options configured in CEC |

### Key Dependencies

| Package | Version | Role |
|---------|---------|------|
| `@sitecore-search/react` | `2.6.0-alpha.0` | Search SDK — hooks, widget HOC, `WidgetsProvider` |
| `@sitecore-search/ui` | `2.6.0-alpha.0` | Pre-built UI primitives (PreviewSearch, ArticleCard, etc.) |
| `@sitecore-search/cli` | `2.6.0-alpha.0` | Code generation (`sc-search new-widget`) |
| `react` | `^18.2.0` | UI framework |
| `react-router-dom` | `^6.8.2` | Client-side routing |
| `vite` | `5.2.6` | Build tool and dev server |
| `tailwindcss` | `^3.4.10` | Utility-first CSS |

---

## Pages & Routing

All routes are defined in `src/App.tsx` and wrapped in:
- `LanguageContext.Provider` — provides active locale to all components
- `WidgetsProvider` — configures SDK with `env`, `customerKey`, `apiKey`, `publicSuffix: true`
- `SEOWidget` (rfkId: `demo_search_seo`) — rendered globally on every page

| Route | Component | Widget(s) Used | Description |
|-------|-----------|----------------|-------------|
| `/` | `Home` | `HomeHighlighted` (`search_home_highlights_articles`), `home_hero` HTML block, `highlight_title` HTML block | Home page with highlighted articles section |
| `/search` | `Search` | `SearchResults` (`rfkid_7`), `QuestionsAnswers` (`rfkid_qa`) | Full search results with facets, sorting, pagination |
| `/detail/:id` | `ArticleDetail` | `ArticleDetail` (custom widget) | Single article detail view |

The `Header` component (rendered on all pages) includes the `PreviewSearch` widget (`rfkid_6`).

### Page Event Tracking

A `withPageTracking` HOC wraps page components to fire page view events. Event type constants:

| Constant | Value | Used on |
|----------|-------|---------|
| `PAGE_EVENTS_HOME` | `"home"` | `/` |
| `PAGE_EVENTS_SEARCH` | `"search"` | `/search` |
| `PAGE_EVENTS_PDP` | `"pdp"` | `/detail/:id` |
| `PAGE_EVENTS_DEFAULT` | `"page"` | fallback |

---

## Widgets

Each widget is a React component wrapped with the SDK's `widget()` HOC, binding it to a widget type and entity type.

### PreviewSearch (`rfkid_6`)

**File:** `src/widgets/PreviewSearch/index.tsx`  
**Type:** `WidgetDataType.SEARCH_RESULTS` → entity `content`  
**Purpose:** Typeahead/preview search in the global header

- Uses `usePreviewSearch` hook
- Fetches suggestions from suggestion block `title_context_aware` (max 6)
- Default items per page: 6
- On keyphrase change: fires `onKeyphraseChange` SDK action
- On form submit: navigates to `/search?q=<value>` via React Router
- Renders `PreviewSearch.Suggestions` + `PreviewSearch.Results` in a popover
- Shows `Spinner` while loading/fetching

**Article model:**
```typescript
type ArticleModel = {
  id: string;
  title: string;
  image_url: string;
  url: string;
  source_id?: string;
};
```

### SearchResults (`rfkid_7`)

**File:** `src/widgets/SearchResults/index.tsx`  
**Type:** `WidgetDataType.SEARCH_RESULTS` → entity `content`  
**Purpose:** Full search results page with facets, sorting, pagination

- Uses `useSearchResults` hook
- Default state: `sortType: "featured_desc"`, `page: 1`, `itemsPerPage: 10`, `keyphrase: ""`
- Renders facet sidebar (left, ~25% width) + results grid/list (right)
- Supports card view toggle: **list** (default) / **grid** via `CardViewSwitcher`
- Shows `QueryResultsSummary`, `SortOrder`, `ResultsPerPage`, `SearchPagination`
- Shows full-screen loading spinner on initial load; semi-opaque overlay while fetching subsequent pages
- When `totalItems === 0`: no results state (facet sidebar and results not rendered)

**Article model:**
```typescript
type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};
```

**Default sort options (must be pre-configured in CEC):**
- `featured_desc`
- `feature_asc`

### HomeHighlighted (`search_home_highlights_articles`)

**File:** `src/widgets/HomeHighlighted/index.tsx`  
**Type:** `WidgetDataType.SEARCH_RESULTS` → entity `content`  
**Purpose:** Displays up to 3 highlighted articles on the home page

- Uses `useSearchResults` hook with a hardcoded query filter:
  - `FilterEqual('type', 'Insights')` — only content of type "Insights"
  - Keyphrase: `"sitecore"`
- Slices results to first 3 articles
- Renders 3-column grid of `ArticleCard` components
- Fires `onItemClick` on article click

### ArticleDetail (custom widget, no fixed rfkId)

**File:** `src/widgets/ArticleDetail/index.tsx`  
**Type:** `WidgetDataType.SEARCH_RESULTS` → entity `content`  
**Purpose:** Displays a single article by ID on the detail page

- Receives `id` prop from the `/detail/:id` URL parameter
- Uses `useSearchResults` with `FilterEqual('id', id)` and `itemsPerPage: 1`
- Renders: `title`, `subtitle`, `description`, `image_url` (falls back to `DEFAULT_IMAGE` if missing)
- `DEFAULT_IMAGE`: `https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/global/temp/doc.svg`

### QuestionsAnswers (`rfkid_qa`)

**File:** `src/widgets/QuestionsAnswers/index.tsx`  
**Type:** Questions widget (experimental)  
**Purpose:** Appears on search page when keyphrase is recognized as a question

- Cannot be created via CEC; requires support request
- Renders on `/` and `/search` when triggered

---

## Data Model

All content is fetched from the Sitecore Search API. There is no local database. The content catalog is managed entirely in CEC.

### Article / Content Entity

```typescript
type ArticleModel = {
  id: string;           // unique content identifier
  type?: string;        // e.g. "Insights"
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;         // canonical URL of the original content
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;   // source identifier in CEC
};
```

### Highlight Configuration

```typescript
const HIGHLIGHT_DATA = {
  pre: '<b>',
  post: '</b>',
  highlightTag: 'b',   // wraps matched keywords in bold
};
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SEARCH_CUSTOMER_KEY` | ✅ | Customer key from CEC Developers resources |
| `VITE_SEARCH_API_KEY` | ✅ | API key from CEC Developers resources |
| `VITE_SEARCH_ENV` | ❌ | Search environment (defaults inferred by SDK) |
| `VITE_SEARCH_PATH` | ❌ | Base path override (defaults to `""`) |

---

## CEC Configuration Requirements

The following must be set up in the Customer Engagement Console (CEC) before the application is functional.

### Sources

Content sources must be created and processed in CEC to populate the search catalog.

### Suggestion Blocks

A suggestion block with field `title_context_aware` must exist (used by the PreviewSearch widget).

### Sorting Options

The following sort criteria must be pre-configured:
- `featured_desc`
- `feature_asc`

### Required Widgets

| Widget Name | Widget ID | Type | Used In | Notes |
|-------------|-----------|------|---------|-------|
| [Search Results Page] Search Results | `rfkid_7` | Search Results | `/search`, `/detail/*` | Grid with facets |
| Preview Search | `rfkid_6` | Preview Search | Every page (header) | Typeahead |
| SEO | `demo_search_seo` | SEO | Every page | |
| Home Hero | `home_hero` | HTML Block | `/` | Language-conditional content |
| Highlight Title | `highlight_title` | HTML Block | `/` | Title for highlighted articles section |
| Search Home Highlighted Articles | `search_home_highlights_articles` | Search Results | `/` | Highlighted articles |
| Questions & Answers | `rfkid_qa` | Questions | `/`, `/search` | Experimental; requires support to create |

---

## Internationalization

Language switching is supported via `LanguageContext` (`src/contexts/languageContext.ts`) and `useLanguage` hook.

**Supported locales:**

| Value | Language |
|-------|---------|
| `en` | English |
| `es` | Español |
| `de` | Deutsch |
| `it` | Italiano |
| `fr` | Français |
| `zh` | 中文 |
| `da` | Dansk |
| `ja` | 日本語 |

Language preference is persisted via `useStorage` hook. The active language is passed to the SDK to filter content by locale.

A `LocaleSelector` component in the header allows users to switch languages at runtime.

---

## Event Tracking

The application integrates Sitecore Search event tracking. Events are sent automatically by the SDK via the `WidgetsProvider`.

| Event | Trigger | SDK Action |
|-------|---------|------------|
| Page view | Route change (via `withPageTracking` HOC) | Page event with type constant |
| Item click | User clicks on any article card | `onItemClick` SDK action |
| Keyphrase change | User types in PreviewSearch input | `onKeyphraseChange` SDK action |
| Search submission | User submits search form | Navigate + keyphrase passed as URL param |

---

## Non-Functional Requirements

### Performance
- Initial load: Vite-optimized production build with TypeScript (`tsc && vite build`)
- No server-side rendering — pure client-side SPA
- Lazy loading / spinner shown during API fetch states

### Browser Support
- Modern evergreen browsers (dictated by React 18 + Vite targets)

### Accessibility
- Uses Radix UI primitives (`@radix-ui/react-accordion`, `@radix-ui/react-icons`) which include ARIA attributes
- Dark mode supported via Tailwind `dark:` classes; toggled by `DarkModeSwitcher` component

### Security
- No user authentication
- API keys loaded from `.env` file (Vite env vars — `VITE_` prefix required to expose to client)
- `.env` file must not be committed to source control

---

## Local Development

### Prerequisites

- Node.js LTS
- A Sitecore Search account with CEC access
- CEC pre-configured (sources, widgets, suggestion blocks, sorting options — see [CEC Configuration Requirements](#cec-configuration-requirements))

### Setup

```bash
git clone git@github.com:Sitecore/Sitecore-Search-JS-SDK-Starter-Kit.git
cd Sitecore-Search-JS-SDK-Starter-Kit
npm install
```

Create `.env` in the project root:
```
VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key from CEC>
```

### Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at `http://localhost:5174` |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run create-widget` | Scaffold a new widget via `@sitecore-search/cli` |

---

## Known Issues & Limitations

- SDK packages are on `2.6.0-alpha.0` — pre-release; breaking changes possible
- `rfkid_qa` (Questions & Answers widget) cannot be self-created in CEC; requires a support ticket
- No server-side rendering or static generation — SEO relies entirely on the `SEOWidget`
- `image_url` falls back to a hardcoded Sitecore CDN URL (`DEFAULT_IMAGE`) when not set on content
- `HomeHighlighted` widget uses a hardcoded filter for type `"Insights"` and keyphrase `"sitecore"` — this must match content configured in the connected CEC account
