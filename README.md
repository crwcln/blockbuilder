# Block Builder

Engine teardown companion for people who pull and take apart engines. Pick an engine from a database of 148 engines (including 31 small engines), follow its step-by-step teardown, document every angle with a guided photo walk-through, and ask Gemini about parts, wear and damage using photos or video.

## Files
- `index.html` — the whole app (UI, photo walk-through, streaming chat)
- `engines.js` — the engine database plus the teardown-step and photo-angle generators. Add engines by adding a line to `RAW`.
- `step-images.js` — maps each step type to a generic reference photo, plus optional per-engine/family photo overrides.
- `img/parts/` — local generic part photos used by the teardown steps.
- `credits.html` — source, author and license for every reference image.
- `CHANGELOG.md`, `changelog.html` — release history (also linked from the Projects sheet).
- `edge-functions/api/chat.js` — streams Gemini answers; keeps your API key on the server
- `sw.js`, `manifest.webmanifest`, icons — installable, works offline (everything except chat and AI photo scanning)

## Deploy (EdgeOne Pages + GitHub)
1. Push this folder to a GitHub repo.
2. In EdgeOne Pages, create a project from the repo. No build command; output directory is the repo root.
3. Add env vars: `GEMINI_API_KEY` (required), `GEMINI_MODEL` (optional, default `gemini-2.5-flash`).
4. Redeploy. On iPhone open the site in Safari and use Share > Add to Home Screen.

## How it works
- **Engines:** each entry records layout, valvetrain, timing drive, fuel, block material, boost and flags (distributor, interference, torque-to-yield head bolts, VVT, balance shafts, dry sump, cylinder deactivation, common rail, rotary, small engine, two-stroke). The app builds a tailored car or small-engine teardown and a matching set of photo angles from those fields. "My engine isn't listed" builds one from a few dropdowns.
- **Small engines:** the library includes singles, V-twins and flat-twins from Briggs & Stratton, Kohler, Honda Engines, Kawasaki Engines, Predator, Tecumseh, Stihl, Echo, Husqvarna, Subaru and Onan. Use the **Small engines** filter. Four-stroke small engines get their own steps (flywheel, recoil, shrouds, sump) and two-strokes get a crankcase and seal-focused teardown instead of car steps.
- **VIN decoder:** enter a 17-character VIN in the header or library. It uses the free NHTSA vPIC service online and falls back to VIN structure offline, then offers the closest library engine or a prefilled custom engine. **Scan VIN** reads the VIN barcode directly when the browser supports `BarcodeDetector`, then falls back to an AI photo read; a valid check digit decodes automatically. **Scan plate** reads the license plate and region with AI, then adds that plate to the current project or attaches it to the next one you start. A plate cannot be decoded into engine specs — use the VIN for an automatic match. AI scanning sends the photo to Gemini and needs a connection plus the deployed chat function; VIN barcode scanning works offline.
- **Onboarding:** starting any project asks a short Discord-style set of questions — goal, symptoms, teardown depth and experience — and feeds those answers into the plan, the Teardown tab and the AI context.
- **Photo walk-through:** a full-screen guide shows where to stand for each shot (front, both sides, rear, top, belt routing, hoses, harness, connectors, turbo plumbing, and so on), then a second set of checkpoints for during teardown (timing marks, valvetrain, pistons, cap markings). Photos are stored on the device in IndexedDB, can carry notes, and can be sent to the AI. A video walk-around is turned into 12 saved frames.
- **Chat:** attach photos or a short video (8 frames are sent). "Check my photos with AI" sends up to 8 of your shots for a review of blurry or missing angles and notable damage.
- **Install & offline:** the app installs from Chrome/Edge (install prompt) or Safari (Share > Add to Home Screen). The service worker caches the app shell, icons, engine data and generic part photos, serves the last-known page offline, and prompts when a new version is ready. Shortcuts open the library, VIN decoder or chat directly.

## Step images
Every teardown step shows a generic reference photo chosen from its text and engine type. These photos show the type of part or tool, not the exact engine, and the caption links to the credits page and says to verify the procedure in the factory manual.

Image sources, authors and licenses are listed in `credits.html`. All reference photos come from Wikimedia Commons under public-domain or Creative Commons licenses.

To use licensed per-engine or family photos, add URLs to `ENGINE_STEP_PHOTOS` in `step-images.js`. The lookup order is:
1. `engineId|stepIndex` — one exact step for one engine
2. `engineId|step title` — same step title across all projects for that engine
3. `family:inline|step title`, `family:v|step title`, `family:flat|step title`, `family:small|step title`, `family:two-stroke|step title`, `family:rotary|step title` — shared family photo

Example: `'chevrolet-small-block-350-gen-i-carbureted|0': '/img/engines/sbc-350/01.jpg'`. Without an override, the generic part photo is used.

Briggs & Stratton engines also show links to the official Briggs manuals/parts-list lookup and model-number locator. Enter the engine's model-type number on those pages to view the exact factory illustrated parts list. The app links to these pages but does not copy or host the OEM diagrams.

## Notes
- The database holds engine facts, notes and known failure points. It deliberately has **no torque specs, clearances or firing orders**. Always confirm those in the factory service manual for the exact engine. The AI is told to do the same.
- Photos and projects live in this browser. Clearing site data erases them.
- Edge functions have a request size limit, so chat photos are shrunk to 1024px and the AI photo check sends at most 8 images at 800px.

## Troubleshooting
- **Chat says "404 / function not found":** the server function isn't deployed. `edge-functions/api/chat.js` must be at the **root** of the repo you connect to EdgeOne (not inside a subfolder), then redeploy. Open `https://your-site/api/chat` in a browser: you should see `{"ok":true,"keySet":true,...}`. A 404 page means the function isn't deployed. `keySet:false` means the `GEMINI_API_KEY` env var isn't set for the deployed environment (redeploy after adding it). AI VIN and license-plate scanning use this same function.
- **Photos not saving / banner about storage:** the browser is blocking IndexedDB. The banner now names the reason (site data blocked, private mode, another tab holding the database, a slow/failed open, or no space). Use Safari or Chrome in a normal tab, not a private tab, Lockdown Mode, or an in-app browser (Instagram, Facebook, Gmail links). If you are viewing an embedded preview, open the site directly. Tap the banner to retry after freeing space or closing other tabs.