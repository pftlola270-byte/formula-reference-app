# FormulaHub

[![CI](https://github.com/pftlola270-byte/formula-reference-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/pftlola270-byte/formula-reference-app/actions/workflows/deploy.yml) [![Tests](https://img.shields.io/badge/tests-15%20passing-24a276)](myapp/src/__tests__/formulas.test.mjs) [![Formulas](https://img.shields.io/badge/formulas-100-526dff)](https://pftlola270-byte.github.io/formula-reference-app/)

![FormulaHub live demo](docs/screenshots/formulahub-live-demo.webp)

FormulaHub is an English, searchable science reference and learning system for mathematics, physics, engineering, chemistry, statistics, and finance. It combines a curated library of **100 formulas** with calculators, explanations, examples, diagrams, quizzes, and practical unit conversion.

## Features

FormulaHub provides a searchable formula library across six disciplines. Users can filter by category, open any formula in the calculator, enter values, and receive a formatted result immediately. The interface is responsive for desktop and mobile screens and supports light and dark themes.

Each formula is represented as structured data with its name, symbolic expression, category, description, variables, units, explicit input constraints, calculation function, result label, result unit, learning meaning, assumptions, example guidance, related formulas, source note, and difficulty level. This keeps domain data separate from the application UI and makes the catalog easier to extend.

The calculator validates required numeric inputs and formula-specific constraints before calculating. It supports non-negative values where scientifically appropriate, integer-only combinatorics inputs, valid factorial domains, non-zero denominators, positive Kelvin temperatures, and real-root-only messaging for the quadratic formula.

The application includes persistent favorites saved under `formula-favorites` in Local Storage. Calculation history is saved under `formula-history`, displayed in the History panel, limited to recent entries, and can be cleared by the user. No account or server is required for these local features.

The Tools section includes a random quick quiz with answer checking and a unit converter. The converter supports length (`mm`, `cm`, `m`, `km`, `in`, `ft`, `yd`, `mi`), mass (`mg`, `g`, `kg`, `lb`), time (`ms`, `s`, `min`, `h`, `day`), temperature (`°C`, `°F`, `K`), and pressure (`Pa`, `kPa`, `bar`, `atm`, `mmHg`). Formula-specific visual diagrams are available for selected geometry and physics relationships.

## Live Demo

[Open FormulaHub](https://pftlola270-byte.github.io/formula-reference-app/)

The fastest way to evaluate the project is to open the live demo: it includes 100 formulas, six disciplines, formula validation, persistent favorites and history, unit conversion, diagrams, and a quick quiz.

### Academic traceability (v1.1)

FormulaHub is introducing academic source traceability incrementally. Verified records use a shared source schema with a title, organization, secure URL, chapter or section when confirmed, a rationale for relevance, and `verified: true`. The first verified batch covers selected physics, chemistry, statistics, and probability relationships; unverified formulas are intentionally not assigned guessed references.

## Project structure

```text
myapp/src/
├── components/
│   ├── FormulaLibrary.jsx       # Formula list composition
│   ├── FormulaCard.jsx          # Individual formula card
│   ├── CalculatorPanel.jsx      # Formula details and calculator UI
│   ├── FormulaDiagram.jsx       # Optional visual diagrams
│   └── HistoryPanel.jsx          # Persistent calculation history
├── data/
│   ├── formulas.js              # Formula catalog and calculation functions
│   ├── formulaMetadata.js       # Constraints and educational metadata
│   └── units.js                  # Categories, icons, unit definitions, conversions
├── hooks/
│   └── usePersistedLists.js      # Favorites and history state
├── lib/
│   ├── validation.js             # Reusable formula input validation
│   └── storage.js                # Safe Local Storage helpers
├── App.jsx                       # Application state and page composition
├── __tests__/
│   └── formulas.test.mjs         # Formula integrity and behavior tests
├── index.css                     # Global responsive styling
└── main.jsx                      # React entry point
```

## Run locally

```bash
cd myapp
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Quality checks

```bash
cd myapp
npm test
npm run lint
npm run build
```

## Deployment

The repository is configured for GitHub Pages through GitHub Actions. The production site is available at:

<https://pftlola270-byte.github.io/formula-reference-app/>

The Vite base path switches automatically between the repository subpath used by GitHub Pages and the root path used by Vercel or another root-hosted deployment.

## Technology

FormulaHub uses React, Vite, and plain CSS. It is intentionally lightweight: there is no backend, database, or external API dependency. Local Storage is used only for user-specific favorites and calculation history in the current browser.
