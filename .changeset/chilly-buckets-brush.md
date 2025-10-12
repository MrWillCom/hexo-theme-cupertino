---
'hexo-theme-cupertino': patch
---

Fix: Eliminate 404 console error on archive, category, and tag pages.

* Resolves a persistent 404 console error by creating the missing `css/archive.css` file.
* Improves internal style maintenance by isolating archive-specific styles from `post-list.scss` to the new dedicated `archive.scss`.
