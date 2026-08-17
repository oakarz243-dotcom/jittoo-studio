# JITTOO Creative Studio

Professional browser-first creative editor foundation.

## Included
- Canvas editor core
- Image, text, sticker and shape layers
- Layer ordering and locking
- Undo/redo
- Drag and drop image import
- Local JSON project save/load
- PNG export helper
- Responsive editor workspace
- AI Studio UI with secure server endpoint integration

## AI
The browser calls `./api/ai/generate`. Provider API keys must remain on a server/API worker and must never be committed to this repository.

Expected response:
```json
{"imageUrl":"https://..."}
```

## Structure
- `css/` UI styling
- `js/editor/` canvas/editor engine
- `js/project/` persistence and export
- `js/ai/` AI integration boundary
- `js/data/` library data

This is intentionally modular so AI, authentication, cloud projects, Pro/Premium and billing can be moved into separate services later without rewriting the editor core.
