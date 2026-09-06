# RoadMind AI — Vehicle Maintenance & Road Analysis — Frontend

Production-oriented, frontend-only research portal built with **React + TypeScript + Vite + Tailwind CSS + Recharts**. It is designed to present the canonical `Model/` research artifacts while keeping the demo deployable as static files.

## Pages

- Home
- Data & Preprocessing
- Model & Results
- Interactive Demo

## Local development

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```

Lint / format:

```bash
npm run lint
npm run format
```

## Production build

```bash
npm run build
npm run preview
```

`npm run build` writes a static site to `dist/` and can be hosted by Vercel, Netlify, GitHub Pages, S3/CloudFront, or any static HTTP server.

## Deploy

### Vercel — one-line CLI flow

```bash
npm install && npm run build && npx vercel --prod
```

For Git-based deployment, import the repository into Vercel and use `npm run build` as the build command with `dist` as the output directory.

### Netlify — one-line CLI flow

```bash
npm install && npm run build && npx netlify deploy --prod --dir=dist
```

For Git-based deployment, use `npm run build` as the build command and `dist` as the publish directory.

## Demo data and model integration

The Interactive Demo is **fully client-side**. It accepts a small CSV or manual input and produces a deterministic prediction plus SHAP-like feature contributions. The current implementation is in:

- `src/data/demo.ts` — demo scoring and embedded sample rows
- `src/lib/csv.ts` — browser CSV parsing, validation, and 250 KB limit
- `public/demo-data/sample-vehicle-input.csv` — downloadable sample input
- `public/demo-data/demo-predictions.json` — optional precomputed output examples

### Replace mock/demo data with the real model later

Preferred integration path:

1. Export the trained model from the canonical notebooks to **ONNX** or **TensorFlow.js**.
2. Put the browser-safe artifact under `public/model/` (or another static asset path).
3. Add a typed inference adapter, e.g. `src/lib/model.ts`, that returns the existing `Prediction` shape.
4. Replace `predict(input)` in `src/pages/Demo.tsx` with that adapter.
5. Replace the illustrative EDA values in `src/components/Charts.tsx` and evaluation numbers in `src/pages/Model.tsx` with measured notebook outputs.
6. If real latitude/longitude or road geometry fields are introduced, add Leaflet/Mapbox and a road map page; the current supplied schema contains no geo fields, so no map dependency is included.

If a backend is desired later, the same UI can call a typed `/predict` endpoint instead; keep the current `DemoInput` and `Prediction` interfaces as the contract.

## Canonical Model/ notebooks

The repository retains the `Model/` directory for future canonical model artifacts. The current frontend does not expose a separate Research or Notebooks page.

## Assumptions / limitations

- The canonical `Model/` notebooks and trained model artifacts were unavailable in the supplied workspace.
- Therefore, displayed metrics, charts, and demo explanation vectors are explicitly **illustrative** and must not be treated as scientific results.
- The demo scorer is deterministic and client-only; it is not a trained production model.
- No backend, database, authentication, telemetry ingestion, or PII collection is included.
- The contact form is intentionally non-submitting until a form provider is selected.
- No geo fields were available, so a Leaflet/Mapbox map is not included yet.

## Accessibility / SEO

- Responsive semantic layout with keyboard-visible focus states.
- ARIA labels on navigation, upload, and live prediction output.
- Page title and Open Graph metadata in `index.html`.
- Color choices and status text are paired so meaning is not conveyed by color alone.

## CI

GitHub Actions runs install, lint, tests, and the production build on pushes and pull requests.

## License

Add the research project's actual license and data-use terms before public release.


## Simplified navigation
The main navigation intentionally keeps only the essential product pages: Home, Data, Model & Results, and Interactive Demo.
