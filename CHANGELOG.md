# Changelog

## v9 - 2026-11-04
- Added a prominent current-project bar under the header with project name, engine and step progress.
- Redesigned the Projects sheet with active-project cards, progress bars and clearer new-project actions.
- Replaced the project delete confirmation with a hold-to-delete button adapted from the React Bits HoldButton component.
- Bumped the service-worker cache to `bb-v9`.

## v8 - 2026-11-04
- Replaced the generic SVG teardown illustrations with 21 generic reference photos covering each part category.
- Added `credits.html` with source, author and license for every reference image.
- Added optional per-engine and per-family photo overrides in `step-images.js`.
- Improved typography with Inter for UI text and refined Barlow Condensed headings.
- Added a user-facing changelog in the Projects sheet.
- Cached the part photos, credits page and changelog for offline use.

## v7 - 2026-11-04
- Added official Briggs & Stratton manuals, parts lookup and model-number links to engine details and project plans.
- Added tests for Briggs-only reference links.

## v6 - 2026-11-04
- Added VIN barcode scanning and AI VIN/license-plate scanning.
- Added plate-to-project attachment, photo storage improvements and fallback decoding.
- Improved chat API error handling and troubleshooting notes.

## v5 - 2026-11-04
- Improved PWA install prompts, update notifications and service-worker caching.

## v4 - 2026-11-04
- Added the Gemini chat endpoint with streaming responses and server-side API key handling.

## v3 - 2026-11-03
- Refactored the app structure and improved readability and maintainability.

## v2 - 2026-11-02
- Expanded the engine library and added guided photo walk-throughs, project onboarding and AI photo review.

## v1 - 2026-11-02
- Initial Block Builder release with engine database, teardown steps, photo storage and offline support.
