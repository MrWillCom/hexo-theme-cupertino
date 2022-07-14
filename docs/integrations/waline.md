# Waline Integration

We support installing Waline to your blog.

Add `waline` property to your blog configuration `_config.yml`:

```yml
waline:
# Don't set `el` here.
  path: location.pathname
  serverURL: "'https://example.com'"
  requiredMeta: "['nick', ...]"
```

All the sub-properties are the same as the script in [HTML References - Quick Start | Waline](https://waline.js.org/en/quick-start.html#html-references) except `el`.

You should not set `el` property, it must match the EJS document.
