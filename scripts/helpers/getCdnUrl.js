hexo.extend.helper.register('getCdnUrl', (package, version, file) => {
  return hexo.theme.config.cdn.template
    .replace(hexo.theme.config.cdn.replacements.package, package)
    .replace(hexo.theme.config.cdn.replacements.version, version)
    .replace(hexo.theme.config.cdn.replacements.file, file)
})
