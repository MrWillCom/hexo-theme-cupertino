# hexo-theme-cupertino

## 2.0.0-beta.1

### Minor Changes

- d59c411: Add a global `ThemeCupertino` object, which sends some config to JS environment.
- b469405: Change `scroll-behavior` to `smooth`.
- d59c411: Re-realize scroll reveal without external dependencies.

## 2.0.0-beta.0

### Major Changes

- 0fac982: Upgrade the structure of navigation and footer configuration, in order to allow configuring their items in an array.
- 0fac982: Fix incomplete config overwriting, arrays won't be merged now.
- 0fac982: Migrate from saved SVGs to icon packs.

### Minor Changes

- 0fac982: Translate all CSS to SCSS.
- 0fac982: Manually format EJS and add Prettier to format JS and SCSS.
- 0fac982: Remove unused i18n strings.
- 0fac982: Pack `post-list` as a `partial`.
- 0fac982: Refine navigation animation.
- 0fac982: Add Changesets for better changelog keeping.

### Patch Changes

- 30cad68: Make scroll reveal effects play only once.
- 0fac982: Remove wildcard transitions to avoid unexpected various transition durations.
