# Frenzie

Frenzie is a production-ready static website built with pure HTML, CSS, and Vanilla JavaScript. It effectively creates a scalable site architecture without the need for frameworks or build tools.

## Source of Truth

**Note:** The `index.html` file is derived from `page.html` (which contains the Framer-exported or production design).
To update the core layout/design:

1. Update `page.html` with the new design code.
2. The Header and Footer are extracted from `page.html` into `components/header.html` and `components/footer.html` respectively.
3. The rest of `page.html` content becomes the body of `index.html` with dynamic inclusions for the header and footer.

## Tech Stack

- **HTML5**: Semantic markup.
- **CSS3**: Variables, Flexbox/Grid for layout.
- **Vanilla JavaScript**: Dynamic component loading (Header/Footer).

## Dynamic Header & Footer

The site uses a dynamic component loading system to keep the Header and Footer consistent across all pages.

- `assets/js/include.js`: Fetches content from `/components/` and injects it into `<div id="header">` and `<div id="footer">`.
- To edit the Header/Footer, modify `components/header.html` or `components/footer.html`.

## Folder Structure

```
frenzie/
├── index.html                (Main Entry, derived from page.html)
├── page.html                 (Source design file)
├── pages/                    (Additional pages)
├── components/               (Reusable HTML parts)
│   ├── header.html           (Extracted Header)
│   └── footer.html           (Extracted Footer)
├── assets/
│   ├── css/
│   │   ├── main.css          (Global styles)
│   │   └── components.css    (Component specific styles)
│   ├── js/
│   │   ├── include.js        (Loader script)
│   │   └── main.js           (Global logic)
│   └── images/
├── README.md
└── .gitignore
```

## How to Add New Pages

1. Duplicate `index.html` to a new file (e.g., `about.html`) to keep the head/meta tags and scripts.
2. Remove the specific content inside the Main content area (between header and footer).
3. Add your new content.
4. Ensure `<div id="header"></div>` and `<div id="footer"></div>` are present.
5. Ensure `<script src="/assets/js/include.js"></script>` is included.

## How to Run Locally

1. **Clone or Download** the repository.
2. **Serve the project**:
   - Because this project uses `fetch()` to load the header and footer, it **must be run on a server** to avoid CORS errors (file:// protocol restrictions).
   - Use **VS Code Live Server**: Open the project in VS Code, right-click `index.html`, and select "Open with Live Server".
   - Or use Python: `python -m http.server 8000`
   - Or use Node: `npx serve .`
3. Open the local address (e.g., `http://127.0.0.1:5500`) in your browser.
