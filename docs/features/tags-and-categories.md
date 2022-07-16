# Tags and Categories

Tags and categories features are enabled by default. But only part of them are available with zero-config. To make full use of them, follow the instructions:

## Tags and Categories Page

Firstly, run these commands:

```sh
$ hexo new page 'tags'
$ hexo new page 'categories'
```

Then, you should get two new files at `source/tags/index.md` and `source/categories/index.md`. Replace all of their content with the following:

`source/tags/index.md`

```markdown
---
type: tags
---
```

`source/categories/index.md`

```markdown
---
type: categories
---
```

Done! Now, `/tags/` and `/categories/` pages will be generated correctly.
