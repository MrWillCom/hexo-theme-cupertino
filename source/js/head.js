window.ThemeCupertino = {}

ThemeCupertino['ColorScheme'] = new (class {
  constructor() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        this.updateCurrent(localStorage.getItem('color-scheme') ?? 'auto')
      })
  }
  get() {
    const stored = localStorage.getItem('color-scheme') ?? 'auto'
    this.updateCurrent(stored)
    return stored
  }
  set(value) {
    document.body.dataset.colorScheme = value
    try {
      localStorage.setItem('color-scheme', value)
    } catch (err) {
      console.error(err)
    }
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
    document.body.dataset.currentColorScheme = current
  }
})()
