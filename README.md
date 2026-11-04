# Block Builder

Engine teardown companion for people who pull and take apart engines. Pick an engine from a database of 117+ engines, follow its step-by-step teardown, document every angle with a guided photo walk-through, and ask Gemini about parts, wear and damage using photos or video.

## Files
- `index.html` — the whole app (UI, photo walk-through, streaming chat)
- `engines.js` — the engine database plus the teardown-step and photo-angle generators. Add engines by adding a line to `RAW`.
- `edge-functions/api/chat.js` — streams Gemini answers; keeps your API key on the server
- `sw.js`, `manifest.webmanifest`, icons — installable, works offline (everything except chat)

## Deploy (EdgeOne Pages + GitHub)
1. Push this folder to a GitHub repo.
2. In EdgeOne Pages, create a project from the repo. No build command; output directory is the repo root.
3. Add env vars: `GEMINI_API_KEY` (required), `GEMINI_MODEL` (optional, default `gemini-2.5-flash`).
4. Redeploy. On iPhone open the site in Safari and use Share > Add to Home Screen.

## How it works
- **Engines:** each entry records layout, valvetrain, timing drive, fuel, block material, boost and flags (distributor, interference, torque-to-yield head bolts, VVT, balance shafts, dry sump, cylinder deactivation, common rail, rotary). The app builds a tailored 30–36 step teardown and a set of photo angles from those fields. "My engine isn't listed" builds one from a few dropdowns.
- **VIN decoder:** enter a 17-character VIN in the header or library. It uses the free NHTSA vPIC service online and falls back to VIN structure offline, then offers the closest library engine or a prefilled custom engine.
- **Onboarding:** starting any project asks a short Discord-style set of questions — goal, symptoms, teardown depth and experience — and feeds those answers into the plan, the Teardown tab and the AI context.
- **Photo walk-through:** a full-screen guide shows where to stand for each shot (front, both sides, rear, top, belt routing, hoses, harness, connectors, turbo plumbing, and so on), then a second set of checkpoints for during teardown (timing marks, valvetrain, pistons, cap markings). Photos are stored on the device in IndexedDB, can carry notes, and can be sent to the AI. A video walk-around is turned into 12 saved frames.
- **Chat:** attach photos or a short video (8 frames are sent). "Check my photos with AI" sends up to 8 of your shots for a review of blurry or missing angles and notable damage.
- **Install & offline:** the app installs from Chrome/Edge (install prompt) or Safari (Share > Add to Home Screen). The service worker caches the app shell, icons and engine data, serves the last-known page offline, and prompts when a new version is ready. Shortcuts open the library, VIN decoder or chat directly.

## Notes
- The database holds engine facts, notes and known failure points. It deliberately has **no torque specs, clearances or firing orders**. Always confirm those in the factory service manual for the exact engine. The AI is told to do the same.
- Photos and projects live in this browser. Clearing site data erases them.
- Edge functions have a request size limit, so chat photos are shrunk to 1024px and the AI photo check sends at most 8 images at 800px.

## Troubleshooting
- **Chat says "404 / function not found":** the server function isn't deployed. `edge-functions/api/chat.js` must be at the **root** of the repo you connect to EdgeOne (not inside a subfolder), then redeploy. Open `https://your-site/api/chat` in a browser: you should see `{"ok":true,"keySet":true,...}`. A 404 page means the function isn't deployed. `keySet:false` means the `GEMINI_API_KEY` env var isn't set for the deployed environment (redeploy after adding it).
- **Photos not saving / banner about storage:** the browser is blocking IndexedDB. Use Safari or Chrome in a normal tab, not a private tab, Lockdown Mode, or an in-app browser (Instagram, Facebook, Gmail links).