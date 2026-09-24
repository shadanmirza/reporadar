# 🚀 RepoRadar

[![Live Demo](https://img.shields.io/badge/Live-Demo-3b82f6?logo=vercel&logoColor=white)](https://reporadar.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-Installable-purple?logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

> A beautiful, installable GitHub repository analytics dashboard — search any public repo and get rich insights into its activity, languages, and community.

Analyze any GitHub repository with interactive charts, live search, dark mode, and offline support — all in one fast, accessible, PWA-ready dashboard.

---

## ✨ Features

- 🔍 **Smart Search** — Debounced live search with keyboard shortcuts (`/` to focus, `Esc` to clear), recent searches persisted in `localStorage`
- 📊 **Interactive Analytics** — Commit activity area charts, language donut charts, and contributor bar charts (Recharts)
- ⚖️ **Compare Mode** — Side-by-side comparison of two repositories
- 🌓 **Dark Mode** — Seamless light/dark toggle with system-preference detection and persistence
- ⚡ **Code Splitting** — Route-based lazy loading with `React.lazy` + `Suspense` for instant first paint
- 🛡️ **Error Boundaries** — Component-level crash isolation; the app never shows a white screen of death
- 📱 **PWA Support** — Installable on mobile & desktop, offline fallback page, auto-updating service worker
- 🔗 **Social Previews** — Dynamic Open Graph/Twitter meta tags per route (LinkedIn, X, Discord)
- ♿ **Accessible** — ARIA labels, keyboard navigation, semantic HTML, 95+ Lighthouse accessibility score

---

## 📸 Screenshots

### Home (Light / Dark)

![Home — Light Mode](./screenshots/home-light.png)
![Home — Dark Mode](./screenshots/home-dark.png)

### Repository Analytics

![Repo Profile — Light Mode](./screenshots/profile-light.png)
![Repo Profile — Dark Mode](./screenshots/profile-dark.png)

---

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 + Vite 5 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 (lazy-loaded routes) |
| Charts | Recharts |
| Icons | Lucide React |
| Meta / SEO | react-helmet-async |
| PWA | vite-plugin-pwa (Workbox) |
| State | React Context + custom hooks |
| HTTP | Native Fetch API |
| Deployment | Vercel |

---

## 🚀 Live Demo

**👉 [https://reporadar.vercel.app](https://reporadar.vercel.app)**

Try searching: `facebook/react`, `vercel/next.js`, or `microsoft/vscode`.

---

## 🏗 Architecture

```javascript
src/
├── components/
│   ├── charts/          # Recharts wrappers (Area, Donut, Bar)
│   ├── ui/              # Reusable primitives (Button, Card, Input, Badge, Skeleton)
│   └── layout/          # Navbar, Footer
├── pages/               # Home, RepoProfile, Compare, NotFound
├── hooks/               # useGitHubData, useRepository, useDebounce, useLocalStorage
├── services/            # API layer — all GitHub REST calls in one place
├── context/             # ThemeContext (dark mode)
├── utils/               # Data transformers for chart-ready shapes
└── ErrorBoundary.jsx    # Crash isolation for chart widgets
```

**Design principles:**

- **Service layer pattern** — all API calls live in `services/githubApi.js`; components never fetch directly
- **Custom hooks** — data fetching, debouncing, and persistence abstracted into reusable hooks
- **Transform-before-render** — raw GitHub API responses are shaped into chart-friendly formats in `utils/`

---

## 🧠 Challenges I Solved

1. **API rate limiting** — Centralized error handling with user-friendly messages showing rate-limit reset times
2. **Race conditions** — Cleanup flags in `useEffect` prevent stale search results from overwriting fresh ones
3. **Search performance** — `useDebounce` hook reduces API calls from one-per-keystroke to one-per-pause
4. **Bundle size** — Route-based code splitting cut the initial JS payload by ~60%
5. **Crash resilience** — Error Boundaries isolate chart failures so the rest of the dashboard keeps working
6. **Social sharing on a SPA** — Static meta tags in `index.html` as a fallback + `react-helmet-async` for dynamic per-route Open Graph tags
7. **Offline experience** — PWA service worker with an offline fallback page

---

## 🚀 Getting Started

### Prerequisites


- A [GitHub Personal Access Token](https://github.com/settings/tokens) (free — raises API limit from 60 → 5,000 requests/hr)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/reporadar.git
cd reporadar

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your token: VITE_GITHUB_TOKEN=ghp_xxxx

# Start dev server
npm run dev
```

### Build & Preview

```bash
npm run build     # production build
npm run preview   # preview the production build locally
```

---

## 🔑 Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token (classic, `public_repo` scope) |

---

## ♿ Accessibility & Performance

- Semantic HTML5 throughout (`<button>`, `<nav>`, `<h1>` — not div soup)
- ARIA labels on all icon-only controls
- **Lighthouse targets:** · Accessibility 95+ · Best Practices 100 · SEO 100

---

## 📄 License

MIT © [Your Name](https://github.com/YOUR_USERNAME)

---

## 🙋 About This Project

Built as a portfolio project to demonstrate production-grade React development: real API integration, data visualization, performance optimization, and modern deployment workflows.