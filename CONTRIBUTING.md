# Contributing to Star Trek Viewing Order

Thank you for your interest in contributing! Whether you're fixing a bug, adding new timeline entries, improving accessibility, or enhancing the design, your help is appreciated. 🖖

## Getting Started

1. **Fork** this repository on GitHub.
2. **Clone** your fork locally:
   ```sh
   git clone https://github.com/<your-username>/Star_Trek_View_Order.git
   cd Star_Trek_View_Order
   ```
3. **Create a branch** for your changes:
   ```sh
   git checkout -b feature/your-feature-name
   ```
4. **Open `index.html`** in your browser to preview. No build step is required.
   - For auto-reloading during development, use a local server:
     ```sh
     npx serve .
     ```
     or use the **Live Server** extension in VS Code.

## Project Structure

```
Star_Trek_View_Order/
├── index.html          # Main HTML file
├── style.css           # Custom styles (dark/light theme, carousel, cards)
├── script.js           # Main JavaScript (timeline, theme, interactivity)
├── data/
│   └── timeline.json   # Timeline data (series, movies, crossovers)
├── assets/
│   ├── favicon.svg     # Site favicon
│   └── images/         # Screenshots for README
├── .github/
│   └── workflows/      # Azure Static Web Apps CI/CD
├── CONTRIBUTING.md     # This file
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Adding or Editing Timeline Entries

Timeline data lives in [`data/timeline.json`](data/timeline.json). Each entry follows this schema:

| Field         | Type   | Required | Description                                       |
|---------------|--------|----------|---------------------------------------------------|
| `type`        | string | ✅       | `"series"`, `"movie"`, or `"crossover"`           |
| `title`       | string | ✅       | Display title                                     |
| `content`     | string | ❌       | Subtitle (e.g., "Seasons 1-4") — used for series  |
| `releaseYear` | string | ✅       | Year or range (e.g., `"2001-2005"` or `"N/A"`)    |
| `platform`    | string | ✅       | `"TV"`, `"OTT"`, or `"Theater"`                   |
| `imdb`        | string | ✅       | IMDb rating or `"N/A"`                             |
| `summary`     | string | ✅       | 1-2 sentence summary                              |
| `trivia`      | string | ✅       | Fun fact about the entry                           |

**Important:** The order of entries in the `storyOrder` array determines the story chronology viewing order. Release order is computed automatically by sorting on `releaseYear`.

## Code Style Guidelines

- **HTML/CSS**: Use [Tailwind CSS](https://tailwindcss.com/) utility classes where possible. Custom styles go in `style.css`.
- **JavaScript**: Vanilla JS only — no frameworks or build tools. Keep it simple and readable.
- **Formatting**: Use 4-space indentation. Use template literals for string interpolation.
- **Accessibility**: All interactive elements should be keyboard-navigable and have appropriate ARIA attributes.

## Reporting Bugs

Please [open an issue](https://github.com/EkmeetSingh/Star_Trek_View_Order/issues/new) with:

- **Description** of the bug
- **Steps to reproduce** (browser, OS, screen size if relevant)
- **Expected vs. actual behavior**
- **Screenshots** if applicable

## Suggesting Features

[Open an issue](https://github.com/EkmeetSingh/Star_Trek_View_Order/issues/new) describing:

- The feature or enhancement you'd like
- Why it would be useful
- Any mockups or examples (optional)

## Submitting a Pull Request

1. Make sure your changes work locally (open `index.html`, test navigation, flip cards, toggles, keyboard nav).
2. Write a clear PR description explaining **what** changed and **why**.
3. Include screenshots for any visual changes.
4. Keep PRs focused — one feature or fix per PR is ideal.

## Code of Conduct

Be respectful and constructive. We're all here because we love Star Trek and building cool things. 🚀

---

*Live long and prosper!* 🖖
