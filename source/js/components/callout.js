ThemeCupertino['Callout'] = (() => {
  const template = document.createElement('template')
  template.innerHTML = `
    ${ThemeCupertino._calloutStyles}
    <div class="container">
      <div class="header">
        <div class="icon"><slot name="icon"></slot></div>
        <div class="title"><slot name="title"></slot></div>
      </div>
      <div class="content"><slot></slot></div>
    </div>
  `

  return class Callout extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]')
      const titleSlot = this.shadowRoot.querySelector('slot[name="title"]')
      const iconContainer = this.shadowRoot.querySelector('.icon')
      const titleContainer = this.shadowRoot.querySelector('.title')
      const header = this.shadowRoot.querySelector('.header')

      const update = () => {
        const hasIcon = iconSlot.assignedNodes().length > 0
        const hasTitle = titleSlot.assignedNodes().length > 0

        iconContainer.classList.toggle('hidden', !hasIcon)
        titleContainer.classList.toggle('hidden', !hasTitle)
        header.classList.toggle('hidden', !hasIcon && !hasTitle)
      }

      iconSlot.addEventListener('slotchange', update)
      titleSlot.addEventListener('slotchange', update)
      update()
    }
  }
})()

customElements.define('htc-callout', ThemeCupertino.Callout)
