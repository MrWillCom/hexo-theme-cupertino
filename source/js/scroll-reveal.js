/**
 * Inspired by [ScrollReveal](https://scrollrevealjs.org/).
 */
ThemeCupertino['ScrollReveal'] = new (class {
  constructor() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-show')
        } else if (ThemeCupertino.scrollRevealDisappear) {
          entry.target.classList.remove('scroll-reveal-show')
        }
      })
    })

    document.querySelectorAll(ThemeCupertino.scrollRevealQuery).forEach(el => {
      el.classList.add('scroll-reveal')
      this.observer.observe(el)
    })
  }

  /**
   * Add a element other than `.scroll-reveal` to observe.
   * @param {Element} el The element to scroll reveal.
   */
  observe(el) {
    this.observer.observe(el)
  }
})()
