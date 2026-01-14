# Evil Login

Modern login page demonstrating accessibility, UX best practices, and contemporary web development patterns.

**Live Demo:** [https://dab.github.io/evil-login/](https://dab.github.io/evil-login/)

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Features

- **Semantic HTML** with proper ARIA attributes for screen readers
- **Smart validation** that validates on blur/change but clears errors immediately on input (non-intrusive UX)
- **Loading states** with disabled button and spinner during API calls
- **Error handling** for network failures, server errors, and invalid credentials
- **Password visibility toggle** with appropriate aria-labels
- **Keyboard navigation** with proper focus management and visible focus states
- **Responsive design** optimized for mobile and desktop

## Tech Stack

- **Vite** - Build tool with HMR and optimized production builds
- **Autoprefixer** - Automatic vendor prefixes for wider browser support
- **PostCSS** - CSS processing pipeline
- **Vanilla JavaScript** - ES6 modules, native form validation API
- **Modern CSS** - @layer, nesting, OKLCH colors, logical properties

## Why These Choices?

| Decision | Rationale |
|----------|-----------|
| Modern CSS features | `@layer` prevents specificity wars, OKLCH provides perceptual uniformity, logical properties enable RTL support |
| Vite | Fast dev server with HMR, optimized production builds with code splitting |
| Autoprefixer | Targets `> 0.5%, last 2 versions, not dead` for broad browser compatibility |
| Modular architecture | `/src` structure with services layer scales easily to multi-page applications |
| Map for validators | O(1) lookup performance instead of if/else chains |
| Native Constraint Validation API | Integrates with browser's built-in validation, works with password managers |

## Test Credentials

| Scenario | Email | Password | Expected Result |
|----------|-------|----------|-----------------|
| Success | demo@example.com | password123 | Green success message |
| Invalid credentials | any@email.com | wrongpass | "Invalid email or password" error |
| Server error | error@test.com | anything | "Server error. Please try again later." |
| Network error | any@email.com | anything | 15% chance: "Network error. Please check your connection." |
| Validation errors | (empty) | (empty) | Field-level "required" messages |
| Invalid email | notanemail | anything | "Please enter a valid email address" |
| Short password | any@email.com | 12345 | "Password must be at least 6 characters" |


## Development

```bash
# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```


## Deployment

Automatic deployment to GitHub Pages via GitHub Actions on every push to `main` branch.

**Setup:**
1. Repository Settings → Pages → Source: "GitHub Actions"
2. Push to `main` branch
3. Workflow builds and deploys to `https://dab.github.io/evil-login/`

## Browser Compatibility

Requires modern browsers (2022+) for:
- CSS `@layer`, nesting, OKLCH colors, logical properties
- ES6 modules
- Native form validation API

Autoprefixer adds vendor prefixes for wider CSS compatibility within this range.
