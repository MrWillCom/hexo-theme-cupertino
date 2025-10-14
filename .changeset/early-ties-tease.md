---
'hexo-theme-cupertino': patch
---

Improve a11y and SEO by ensuring each page has only one `<h1>`.

- In `post.ejs`, the "About This Post" heading has been changed from `<h1>` to `<h2>` to reduce redundant H1 tags.
- In `tags.ejs`, `categories.ejs`, `archive.ejs`, and `index.ejs`, the main headings have been elevated from `<h2>` to `<h1>` to ensure a clear primary heading on each page.
