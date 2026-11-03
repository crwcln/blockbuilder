# BlockBuilder

Deploy the repo root as-is (no build command). `index.html` is the landing page, `app.html` is the tool.

- `app.html` has its CSS, JS and engine data inlined so it cannot fail on a missing file. Edit the sources in `src/` (`app.js`, `styles.css`, `engines.json`, `app.template.html`), then rebuild by running the build snippet in `build.py`.
- `functions/api/gemini.js` is the Gemini proxy. Set `GEMINI_API_KEY` in EdgeOne Pages environment variables. Never commit the key.
- Set `REPO` at the top of `src/app.js` to your GitHub repo, for the "Add an engine" submissions.
