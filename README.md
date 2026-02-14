# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Vercel (Production)

- **SPA routing (reload = 404)**: this repo includes [vercel.json](vercel.json) with a rewrite to `/index.html`.
- **API base URL**: set `VITE_API_URL` in Vercel Project → Settings → Environment Variables.
  - Example: `VITE_API_URL=https://your-backend-domain.com`
  - Important: use **https** in production (otherwise browser may block mixed content).
- **If you don’t have a backend yet** (demo mode): the dashboard analytics chart auto-falls back to mock data in production when `VITE_API_URL` is not set.
