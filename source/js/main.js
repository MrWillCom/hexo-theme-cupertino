;(() => {
  var navEl = document.getElementById('theme-nav')
  navEl.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      if (!document.body.classList.contains('nav-open')) {
        document.body.style.setProperty(
          '--open-height',
          48 +
            document.querySelector('#theme-nav .nav-items').clientHeight +
            'px',
        )
      }

      document.body.classList.toggle('nav-open')
    } else {
      document.body.style.removeProperty('--open-height')
      document.body.classList.remove('nav-open')
    }
  })

  window.addEventListener('resize', () => {
    if (document.body.classList.contains('nav-open')) {
      document.body.style.setProperty(
        '--open-height',
        48 +
          document.querySelector('#theme-nav .nav-items').clientHeight +
          'px',
      )
    }
    if (window.innerWidth > 600) {
      document.body.style.removeProperty('--open-height')
      document.body.classList.remove('nav-open')
    }
  })

  if (document.getElementById('theme-color-scheme-toggle')) {
    var themeColorSchemeToggleEl = document.getElementById(
      'theme-color-scheme-toggle',
    )
    var options = themeColorSchemeToggleEl.getElementsByTagName('input')

    for (const option of options) {
      if (option.value == document.body.dataset.colorScheme) {
        option.checked = true
      }
      option.addEventListener('change', ev => {
        var value = ev.target.value
        ThemeCupertino.ColorScheme.set(value)
        for (const o of options) {
          if (o.value != value) {
            o.checked = false
          }
        }
      })
    }
  }

  if (document.body.attributes['data-rainbow-banner']) {
    var shown = false
    switch (document.body.attributes['data-rainbow-banner-shown'].value) {
      case 'always':
        shown = true
        break
      case 'auto':
        shown =
          new Date().getMonth() + 1 ==
          parseInt(
            document.body.attributes['data-rainbow-banner-month'].value,
            10,
          )
        break
      default:
        break
    }
    if (shown) {
      var banner = document.createElement('div')

      banner.style.setProperty(
        '--gradient',
        `linear-gradient(90deg, ${document.body.attributes['data-rainbow-banner-colors'].value})`,
      )
      banner.classList.add('rainbow-banner')

      navEl.after(banner)
    }
  }

  if (document.body.attributes['data-toc']) {
    const content = document.getElementsByClassName('content')[0]
    const maxDepth = document.body.attributes['data-toc-max-depth'].value

    var headingSelector = ''
    for (var i = 1; i <= maxDepth; i++) {
      headingSelector += 'h' + i + ','
    }
    headingSelector = headingSelector.slice(0, -1)
    const headings = Array.from(content.querySelectorAll(headingSelector))

    var source = headings
      .map(heading => ({
        html: heading.innerHTML,
        href:
          heading.getElementsByClassName('headerlink')[0]?.attributes['href']
            .value ?? null,
      }))
      .filter(heading => heading.href)

    const tocContainer = document.createElement('aside')
    const toc = document.createElement('div')
    toc.classList.add('toc')
    for (const i in source) {
      const item = document.createElement('p')
      const link = document.createElement('a')
      link.href = source[i].href
      link.innerHTML = source[i].html
      link.removeChild(link.getElementsByClassName('headerlink')[0])
      item.appendChild(link)
      toc.appendChild(item)
    }
    tocContainer.appendChild(toc)

    if (toc.children.length > 0) {
      document
        .getElementsByClassName('post')[0]
        .getElementsByClassName('meta')[0]
        .after(tocContainer)
    }
  }
})()
