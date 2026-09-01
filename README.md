# FormulaHub

FormulaHub is an English, searchable science reference and learning system for mathematics, physics, engineering, chemistry, statistics, and finance. It combines a curated library of **62 formulas** with calculators, explanations, examples, diagrams, quizzes, and practical unit conversion.

## Features

FormulaHub provides a searchable formula library across six disciplines. Users can filter by category, open any formula in the calculator, enter values, and receive a formatted result immediately. The interface is responsive for desktop and mobile screens and supports light and dark themes.

Each formula is represented as structured data with its name, symbolic expression, category, description, variables, units, explicit input constraints, calculation function, result label, result unit, learning meaning, assumptions, example guidance, related formulas, source note, and difficulty level. This keeps domain data separate from the application UI and makes the catalog easier to extend.

The calculator validates required numeric inputs and formula-specific constraints before calculating. It supports non-negative values where scientifically appropriate, integer-only combinatorics inputs, valid factorial domains, non-zero denominators, positive Kelvin temperatures, and real-root-only messaging for the quadratic formula.

The application includes persistent favorites saved under `formula-favorites` in Local Storage. Calculation history is saved under `formula-history`, displayed in the History panel, limited to recent entries, and can be cleared by the user. No account or server is required for these local features.

The Tools section includes a random quick quiz with answer checking and a unit converter. The converter supports length (`mm`, `cm`, `m`, `km`, `in`, `ft`, `yd`, `mi`), mass (`mg`, `g`, `kg`, `lb`), time (`ms`, `s`, `min`, `h`, `day`), temperature (`°C`, `°F`, `K`), and pressure (`Pa`, `kPa`, `bar`, `atm`, `mmHg`). Formula-specific visual diagrams are available for selected geometry and physics relationships.

## Project structure

```text
myapp/src/
├── components/
│   └── FormulaLibrary.jsx       # Formula list and calculator presentation
├── data/
│   ├── formulas.js              # Formula catalog and calculation functions
│   ├── formulaMetadata.js       # Constraints and educational metadata
│   └── units.js                  # Categories, icons, unit definitions, conversions
├── lib/
│   └── validation.js             # Reusable formula input validation
├── App.jsx                       # Application state and page composition
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
npm run lint
npm run build
```

## Deployment

The repository is configured for GitHub Pages through GitHub Actions. The production site is available at:

<https://pftlola270-byte.github.io/formula-reference-app/>

The Vite base path switches automatically between the repository subpath used by GitHub Pages and the root path used by Vercel or another root-hosted deployment.

## Technology

FormulaHub uses React, Vite, and plain CSS. It is intentionally lightweight: there is no backend, database, or external API dependency. Local Storage is used only for user-specific favorites and calculation history in the current browser.
