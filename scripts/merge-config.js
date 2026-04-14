// Inspired by Hexo Theme Volantis
// [hexo-theme-volantis/scripts/events/lib/config.js](https://github.com/volantis-x/hexo-theme-volantis/blob/8d2394aa3e8a665702f26a686e85adcf59cd114d/scripts/events/lib/config.js)
// [MIT](https://github.com/volantis-x/hexo-theme-volantis/blob/8d2394aa3e8a665702f26a686e85adcf59cd114d/LICENSE) Licensed

hexo.on('generateBefore', () => {
  const isObject = v => {
    return v && typeof v === 'object' && !Array.isArray(v)
  }

  const merge = (target, source) => {
    for (const key in source) {
      if (isObject(target[key]) && isObject(source[key])) {
        merge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }

    return target
  }

  merge(hexo.theme.config, hexo.config.theme_config)
})
