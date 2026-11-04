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
- **Photo walk-through:** a full-screen guide shows where to stand for each shot (front, both sides, rear, top, belt routing, hoses, harness, connectors, turbo plumbing, and so on), then a second set of checkpoints for during teardown (timing marks, valvetrain, pistons, cap markings). Photos are stored on the device in IndexedDB, can carry notes, and can be sent to the AI. A video walk-around is turned into 12 saved frames.
- **Chat:** attach photos or a short video (8 frames are sent). "Check my photos with AI" sends up to 8 of your shots for a review of blurry or missing angles and notable damage.

## Notes
- The database holds engine facts, notes and known failure points. It deliberately has **no torque specs, clearances or firing orders**. Always confirm those in the factory service manual for the exact engine. The AI is told to do the same.
- Photos and projects live in this browser. Clearing site data erases them.
- Edge functions have a request size limit, so chat photos are shrunk to 1024px and the AI photo check sends at most 8 images at 800px.
