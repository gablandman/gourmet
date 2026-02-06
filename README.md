# gourmet-app

The website is a React SPA. It's usung react 19, typescript, vite. served by nginx in a docker container.

## features

- browse all recipes with image grid
- recipe detail page with ingredients, instructions, prep/cook time
- cookie-based auth (login/logout)
- add/remove favorites (protected behind login)
- 404 page
- responsive

## run locally

```bash
npm install
npm run dev
```

or with docker:

```bash
docker pull ghcr.io/gablandman/gourmet-app:latest
docker run -p 8080:8080 ghcr.io/gablandman/gourmet-app:latest
```

note: login only works with `npm run dev` locally (vite proxies the API to handle cookies).

## architecture

CSR (client-side rendering) with react-router. the API layer uses `fetch` with `credentials: "include"` and `Accept: application/json` headers. Auth state is managed via a react context. Vite proxies `/api` to the gourmet server in dev to avoid cross-origin cookie issues.

## ux/ui

header with the cuisine.jpeg banner (optimized via squoosh from 18MB to ~200KB).

## code quality

Typescript everywhere on strict mode. eslint with react-hooks and react-refresh plugins. components are small and single-purpose (RecipeCard, FavoriteButton, ProtectedRoute, etc).

## performance

I ran lighthouse and addressed the main issues:
- preload the LCP image (cuisine.jpeg) in `<head>`
- `fetchPriority="high"` on the banner image
- `loading="lazy"` on recipe card images with explicit width/height
- cuisine.jpeg manually compressed via squoosh
- vite tree-shakes and minifies the production bundle
- nginx serves with gzip and immutable cache headers on assets

Before : 

+![lighthouse before](docs/lighthouse-before.png) 

After :

+![lighthouse after](docs/lighthouse-after.png)

## Best Practices

testing: claude genrated 14 awesome tests with vitest + testing-library (api service, RecipeCard, HomePage, FavoriteButton)

ci/cd: github actions workflow for lint + test + build. tested locally with act. docker image built and pushed to ghcr.io

docker: multi-stage build (node for build, nginx for serve), non-root user, port 8080

git: incremental commits, ci tested locally with act before pushing

Locally, it looked more like this :

<img width="897" height="645" alt="Capture d&#39;écran 2026-02-06 154916" src="https://github.com/user-attachments/assets/1a796bc1-9717-4fde-b50e-4214aed37a3c" />

linting: eslint with typescript-eslint.
