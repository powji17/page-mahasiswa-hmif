# page-mahasiswa-hmif

Static landing page for HMIF with Tailwind CSS.

## Requirements

- Node.js 18 or newer
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

This watches `src/input.css` and rebuilds `assets/css/output.css` on changes.

## Production build

```bash
npm run build
```

This generates a minified CSS build in `assets/css/output.css`.

## Preview locally

```bash
npm run preview
```

Or:

```bash
npm start
```

## Project structure

- `index.html` - main page entry point
- `src/input.css` - Tailwind source input
- `assets/css/output.css` - generated CSS output
- `assets/js/main.js` - reserved for browser behavior if needed later
