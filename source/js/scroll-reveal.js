/**
 * Inspired by [ScrollReveal](https://scrollrevealjs.org/).
 */
ThemeCupertino['ScrollReveal'] = new (class {
  constructor() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-show')
        } else if (document.body.dataset.scrollRevealDisappear === 'true') {
          entry.target.classList.remove('scroll-reveal-show')
        }
      })
    })

    document
      .querySelectorAll(document.body.dataset.scrollRevealQuery)
      .forEach(el => {
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
