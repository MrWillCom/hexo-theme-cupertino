;(() => {
  var navEl = document.getElementById('theme-nav')
  navEl.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      if (navEl.classList.contains('open')) {
        navEl.style.height = ''
      } else {
        navEl.style.height =
          48 +
          document.querySelector('#theme-nav .nav-items').clientHeight +
          'px'
      }
      navEl.classList.toggle('open')
    } else {
      if (navEl.classList.contains('open')) {
        navEl.style.height = ''
        navEl.classList.remove('open')
      }
    }
  })
  window.addEventListener('resize', e => {
    if (navEl.classList.contains('open')) {
      navEl.style.height =
        48 + document.querySelector('#theme-nav .nav-items').clientHeight + 'px'
    }
    if (window.innerWidth > 600) {
      if (navEl.classList.contains('open')) {
        navEl.style.height = ''
        navEl.classList.remove('open')
      }
    }
  })

  // a simple solution for managing cookies
  const Cookies = new (class {
    get(key, fallback) {
      const temp = document.cookie
        .split('; ')
        .find(row => row.startsWith(key + '='))
      if (temp) {
        return temp.split('=')[1]
      } else {
        return fallback
      }
    }
    set(key, value) {
      document.cookie =
        key +
        '=' +
        value +
        '; path=' +
        document.body.getAttribute('data-config-root')
    }
  })()

  const ColorScheme = new (class {
    constructor() {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          this.updateCurrent(Cookies.get('color-scheme', 'auto'))
        })
    }
    get() {
      const stored = Cookies.get('color-scheme', 'auto')
      this.updateCurrent(stored)
      return stored
    }
    set(value) {
      bodyEl.setAttribute('data-color-scheme', value)
      Cookies.set('color-scheme', value)
      this.updateCurrent(value)
      return value
    }
    updateCurrent(value) {
      var current = 'light'
      if (value == 'auto') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          current = 'dark'
        }
      } else {
        current = value
      }
      document.body.setAttribute('data-current-color-scheme', current)
    }
  })()

  if (document.getElementById('theme-color-scheme-toggle')) {
    var bodyEl = document.body
    var themeColorSchemeToggleEl = document.getElementById(
      'theme-color-scheme-toggle',
    )
    var options = themeColorSchemeToggleEl.getElementsByTagName('input')

    if (ColorScheme.get()) {
      bodyEl.setAttribute('data-color-scheme', ColorScheme.get())
    }

    for (const option of options) {
      if (option.value == bodyEl.getAttribute('data-color-scheme')) {
        option.checked = true
      }
      option.addEventListener('change', ev => {
        var value = ev.target.value
        ColorScheme.set(value)
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
    const headings = content.querySelectorAll(headingSelector)

    var source = []
    headings.forEach(heading => {
      source.push({
        html: heading.innerHTML,
        href: heading.getElementsByClassName('headerlink')[0].attributes['href']
          .value,
      })
    })

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

    if (toc.children.length != 0) {
      document
        .getElementsByClassName('post')[0]
        .getElementsByClassName('divider')[0]
        .after(toc)
      const divider = document.createElement('div')
      divider.classList.add('divider')
      toc.after(divider)
    }
  }
})()
