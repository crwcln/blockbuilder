# BlockBuilder

Engine teardown guide with guided photo capture and a Gemini assistant. Plain HTML/JS, installable PWA.

## Run locally
PWA features and the camera need HTTPS or localhost. Front end only: `npx serve .`
To test the Gemini function too, use the EdgeOne CLI (`npm i -g edgeone`, then `edgeone pages dev`) with `GEMINI_API_KEY` set.

## Deploy
1. Push to GitHub.
2. In EdgeOne Pages, create a project from the repo. No build command. Output directory: the repo root.
3. Add the environment variable `GEMINI_API_KEY` (optionally `GEMINI_MODEL`). Never commit the key.

## Add an engine
Add an object to `engines/engines.json` (copy an existing one). Bump `const V` in `sw.js` so installed apps refresh their cache.
