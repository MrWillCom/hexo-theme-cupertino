# hexo-theme-cupertino

## 2.1.0

### Minor Changes

- b756952: Smooth scroll is changed to disabled by default.
- 08752a5: Remove some default config items.

## 2.0.0

### Major Changes

- 0fac982: Upgrade the structure of navigation and footer configuration, in order to allow configuring their items in an array.
- ee54605: Reorganize CSS variables for colors, filters and radiuses. Old variables are replaced with the new ones named in a better format.
- 0411835: Replace hexo-renderer-sass with a custom Sass renderer. `node_sass` option is removed.
- 856ed22: Reimplement search features with [Pagefind](https://pagefind.app/). Search features now require Pagefind to operate.
- 0fac982: Fix incomplete config overwriting, arrays won't be merged now.
- 0fac982: Migrate from saved SVGs to icon packs.

### Minor Changes

- 5ff6d1e: Update date display format to make it configurable in theme config `date_display_format`.
- 75a504b: Add cover image to the top of a post.
- ba58d2c: Add post count for Tags and Categories page, configurable in `tags_post_count` and `categories_post_count`.
- 78bda33: Change font to Inter.
- 0fac982: Translate all CSS to SCSS.
- 3e5ce9e: Update the appearance of badges.
- d59c411: Add a global `ThemeCupertino` object, which sends some config to JS environment.
- 63d82f6: Move the exported configurations in the global object called `ThemeCupertino` to the dataset of body.
- 4def816: Add [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll.
- 0fac982: Manually format EJS and add Prettier to format JS and SCSS.
- 26df5fa: Change transform origin of hero exit while scrolling to left top.
- b82e57c: Add CDN configuration to allow custom CDNs.
- 3d48ff1: Move expanded height of nav to `--open-height`.
- b469405: Change `scroll-behavior` to `smooth`.
- 0fac982: Remove unused i18n strings.
- d8e75b1: Completely remove `docs/` from the repository.
- 3e5ce9e: Add options for choosing built-in components, in theme configuration `builtin_components`.
- 1716eef: Update the animation of view transition and split nav transition from the whole page.
- c6e8083: Put TOC in a `<aside>` to indicate it is a non-content part.
- 0fac982: Pack `post-list` as a `partial`.
- 046d686: Add "Skip to content" button.
- 78c635e: Add styles for `<figcaption>` in `<figure>`.
- 0fac982: Refine navigation animation.
- 9f01edd: Add Autoprefixer to re-support some Safaris.
- 5cd71dc: Add carousel component.
- 1c153f9: Redesign hero section and avoid text overflow.
- 85a912a: Add `about_extra_description` option for posts.
- c862f35: Add a series of tags for building cards.
- 0ded662: Add `insertions.head.ending` and `insertions.body.ending` options for custom code injections to `<head />` and `<body />`.
- dfc06c7: Remove the divider before the TOC.
- e3168a0: Add optional hero exit animation while scrolling on root page, whose blur filter is also optional.
- 2bdcb6e: Add nav bar blur gradient effect.
- acef781: Add view transition.
- 0fac982: Add Changesets for better changelog keeping.
- d59c411: Re-realize scroll reveal without external dependencies.
- 8ebca4c: Reimplement [OGP](https://ogp.me/) with Hexo's `open_graph()` helper. The configuration options `og_enabled`, `og_image` and `og` are now deprecated.

### Patch Changes

- a9ea6db: Fix cover image overlaying on meta area.
- 83268b5: Update i18n strings.
- b1493ba: Make rainbow banner disabled by default.
- 9a08dfa: Fix `datetime` of `<time />` in post list indicates the build date instead of the post's publish date.
- e720eab: Fix the flicker after page load when color scheme is different from default.
- c0ceb00: Use `<time />` to display dates to make it more readable for browsers.
- 30cad68: Make scroll reveal effects play only once.
- 296ab86: Reimplement tags and categories list in purer EJS.
- 45c8b02: Make search disabled by default.
- af8e0ba: Reimplement post list grid and card grid with `gap` instead of `margin`.
- bd6bfa6: Fix post list items and cards reappearing.
- 0a1ac4a: Update styles of the excerpt in post list.
- dd2d788: Disable animation with scrolling on unsupported browsers.
- 125c839: Fix corner radius of images when filling the width.
- 2593d9b: Fix the failed rounded corners of Prev/Next button in paginator.
- 271a635: Change default configuration `hero_exit_while_scrolling.blur_filter` to `false`.
- 837176c: Remove `-webkit-` prefix from `backdrop-filter`, Safari 17.6 and earlier are no longer supported.
- 3fe3462: Change the font and its size of inline code.
- 5d6c178: Make the background of nav with blur gradient be the same as the background of the page.
- 0fac982: Remove wildcard transitions to avoid unexpected various transition durations.
- 4e359c6: Migrate from cookies to localStorage.

## 2.0.0-beta.11

### Major Changes

- 0411835: Replace hexo-renderer-sass with a custom Sass renderer. `node_sass` option is removed.

### Patch Changes

- 3fe3462: Change the font and its size of inline code.

## 2.0.0-beta.10

### Minor Changes

- 5cd71dc: Add carousel component.
- 85a912a: Add `about_extra_description` option for posts.

### Patch Changes

- a9ea6db: Fix cover image overlaying on meta area.

## 2.0.0-beta.9

### Major Changes

- 856ed22: Reimplement search features with [Pagefind](https://pagefind.app/). Search features now require Pagefind to operate.

### Minor Changes

- 75a504b: Add cover image to the top of a post.
- 78bda33: Change font to Inter.
- 26df5fa: Change transform origin of hero exit while scrolling to left top.
- 1c153f9: Redesign hero section and avoid text overflow.

### Patch Changes

- 5d6c178: Make the background of nav with blur gradient be the same as the background of the page.

## 2.0.0-beta.8

### Minor Changes

- 2bdcb6e: Add nav bar blur gradient effect.
- 8ebca4c: Reimplement [OGP](https://ogp.me/) with Hexo's `open_graph()` helper. The configuration options `og_enabled`, `og_image` and `og` are now deprecated.

### Patch Changes

- e720eab: Fix the flicker after page load when color scheme is different from default.
- 4e359c6: Migrate from cookies to localStorage.

## 2.0.0-beta.7

### Minor Changes

- 63d82f6: Move the exported configurations in the global object called `ThemeCupertino` to the dataset of body.
- 4def816: Add [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll.
- c6e8083: Put TOC in a `<aside>` to indicate it is a non-content part.
- 0ded662: Add `insertions.head.ending` and `insertions.body.ending` options for custom code injections to `<head />` and `<body />`.
- dfc06c7: Remove the divider before the TOC.

### Patch Changes

- 2593d9b: Fix the failed rounded corners of Prev/Next button in paginator.

## 2.0.0-beta.6

### Minor Changes

- 3e5ce9e: Update the appearance of badges.
- d8e75b1: Completely remove `docs/` from the repository.
- 3e5ce9e: Add options for choosing built-in components, in theme configuration `builtin_components`.
- 9f01edd: Add Autoprefixer to re-support some Safaris.
- c862f35: Add a series of tags for building cards.

### Patch Changes

- af8e0ba: Reimplement post list grid and card grid with `gap` instead of `margin`.
- dd2d788: Disable animation with scrolling on unsupported browsers.
- 271a635: Change default configuration `hero_exit_while_scrolling.blur_filter` to `false`.

## 2.0.0-beta.5

### Major Changes

- ee54605: Reorganize CSS variables for colors, filters and radiuses. Old variables are replaced with the new ones named in a better format.

### Minor Changes

- ba58d2c: Add post count for Tags and Categories page, configurable in `tags_post_count` and `categories_post_count`.
- b82e57c: Add CDN configuration to allow custom CDNs.
- 046d686: Add "Skip to content" button.
- e3168a0: Add optional hero exit animation while scrolling on root page, whose blur filter is also optional.

### Patch Changes

- 9a08dfa: Fix `datetime` of `<time />` in post list indicates the build date instead of the post's publish date.
- 296ab86: Reimplement tags and categories list in purer EJS.
- 125c839: Fix corner radius of images when filling the width.
- 837176c: Remove `-webkit-` prefix from `backdrop-filter`, Safari 17.6 and earlier are no longer supported.

## 2.0.0-beta.4

### Minor Changes

- 5ff6d1e: Update date display format to make it configurable in theme config `date_display_format`.
- 78c635e: Add styles for `<figcaption>` in `<figure>`.

### Patch Changes

- c0ceb00: Use `<time />` to display dates to make it more readable for browsers.
- 0a1ac4a: Update styles of the excerpt in post list.

## 2.0.0-beta.3

### Minor Changes

- 3d48ff1: Move expanded height of nav to `--open-height`.
- 1716eef: Update the animation of view transition and split nav transition from the whole page.

## 2.0.0-beta.2

### Minor Changes

- acef781: Add view transition.

### Patch Changes

- 83268b5: Update i18n strings.
- bd6bfa6: Fix post list items and cards reappearing.

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
