<!-- .github/copilot-instructions.md -->
# Copilot instructions for this repository

Purpose: give an AI coding agent the minimal, concrete knowledge to be productive in this repo.

- Quick checklist for this task:
  - Discover big-picture architecture and primary entry points (server.js, src/app.js).
  - Note developer workflows and exact commands to run or edit (npm scripts, nodemon usage).
  - Point out conventions (ESM modules, where middleware/routes belong).
  - List external integrations and common env vars (mongoose/MONGO_URI, jwt, dotenv).

Quick start (developer-visible commands)

- Install deps: run `npm install` in the project root.
- Start in dev mode: `npm run dev` — this runs the `dev` script from `package.json` which is `nodemon server.js`.
  - Note: `nodemon` is not listed in dependencies; it may be installed globally or should be added as a devDependency if not present.

Project layout and big-picture

- Entry points
  - `package.json` lists the project as ESM (`"type": "module"`).
  - The repository expects a top-level server file `server.js` (used by the `dev` script). Currently `server.js` is empty in the repo — when adding a server process, import and use `src/app.js` there.

- Application structure
  - `src/app.js` defines the Express application instance and is the place to add middleware and route wiring.
  - Keep core express configuration (parsers, cookie-parser, auth middleware, route registration) in `src/app.js` and start listening in `server.js`.

Patterns and conventions to follow (examples)

- ESM imports/exports
  - Use `import` / `export default` consistently. Example pattern to follow when creating or updating files:
    - `src/app.js` should export the express app (`export default app`) and `server.js` should `import app from './src/app.js'` and call `app.listen(...)`.

- Middleware & routes
  - Add global middleware (body parser, cookie parser, dotenv config) at the top of `src/app.js` and register route modules from `src/routes/*` (create the folder when needed).

- Data layer / integrations
  - `mongoose` is used for MongoDB access. Follow the typical pattern: use `dotenv` to load `MONGO_URI`, call `mongoose.connect(process.env.MONGO_URI)` in `server.js` before `app.listen()`.
  - Authentication uses `jsonwebtoken` and `bcryptjs` — expect JWT-based auth and password hashing.

Developer workflows, debugging, tests

- No test runner is configured. The `test` script is the default placeholder.
- Use `npm run dev` to run the app during development. If debugging in an editor, start the same `server.js` entry and attach the Node debugger.
- If `nodemon` isn't available, install it locally: `npm install --save-dev nodemon` and confirm `dev` script remains `nodemon server.js`.

Practical examples (copy/paste-ready snippets)

- Minimal `src/app.js` pattern (what AI changes should match):

  - Export the app so server.js can import it.

- Minimal `server.js` pattern (what AI changes should match):

  - Connect mongoose, import `src/app.js`, then start the server. Use `process.env.PORT || 3000`.

Common pitfalls and repo-specific notes

- package.json `main` is `index.js` but dev script targets `server.js`. Prefer `server.js` as the runtime entry. If you add `index.js`, keep consistency.
- The repo is ESM (`"type": "module"`) — avoid CommonJS `require()`/`module.exports` unless you change `type`.
- `server.js` in this snapshot is empty; before running `npm run dev` ensure `server.js` contains the bootstrapping code.

Files to inspect for tasks

- `package.json` — scripts and dependencies (start here for commands and runtime flags).
- `server.js` — runtime bootstrap (listen, DB connect). If empty, adding it is expected when wiring the app.
- `src/app.js` — express app: middleware and routes go here.

If you need clarification

- Ask which env vars are expected (I will look for a `.env` or existing secrets). If none exist, create a `.env.example` showing required fields like `PORT`, `MONGO_URI`, `JWT_SECRET`.

Please review this file and tell me if you'd like more examples (route wiring, auth middleware, or a small test harness) or want me to create/patch `server.js` and `src/app.js` to a runnable minimal server.
