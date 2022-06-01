(() => {
    var navEl = document.getElementById('theme-nav');
    navEl.addEventListener('click', (e) => {
        if (window.innerWidth <= 600) {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
            } else {
                navEl.style.height = 48 + document.querySelector('#theme-nav .nav-items').clientHeight + 'px'
            }
            navEl.classList.toggle('open')
        } else {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
                navEl.classList.remove('open')
            }
        }
    })
    window.addEventListener('resize', (e) => {
        if (navEl.classList.contains('open')) {
            navEl.style.height = 48 + document.querySelector('#theme-nav .nav-items').clientHeight + 'px'
        }
        if (window.innerWidth > 600) {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
                navEl.classList.remove('open')
            }
        }
    })

    // a simple solution for managing cookies
    const Cookies = new class {
        constructor() {
            if (!this.get('path')) { this.set('path', document.body.getAttribute('data-config-root')) }
        }
        get(key, fallback) {
            const temp = document.cookie.split('; ').find(row => row.startsWith(key + '='))
            if (temp) {
                return temp.split('=')[1];
            } else {
                return fallback
            }
        }
        set(key, value) {
            document.cookie = key + '=' + value
        }
    }

    if (document.getElementById('theme-color-scheme-toggle')) {
        var bodyEl = document.body
        var themeColorSchemeToggleEl = document.getElementById('theme-color-scheme-toggle')
        var options = themeColorSchemeToggleEl.getElementsByTagName('input')

        if (Cookies.get('color-scheme', 'auto')) {
            bodyEl.setAttribute('data-color-scheme', Cookies.get('color-scheme', 'auto'))
        }

        for (const option of options) {
            if (option.value == bodyEl.getAttribute('data-color-scheme')) {
                option.checked = true
            }
            option.addEventListener('change', (ev) => {
                var value = ev.target.value
                bodyEl.setAttribute('data-color-scheme', value)
                Cookies.set('color-scheme', value)
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
                break;
            case 'auto':
                shown = new Date().getMonth() + 1 == parseInt(document.body.attributes['data-rainbow-banner-month'].value, 10)
                break;
            default:
                break;
        }
        if (shown) {
            var banner = document.createElement('div')

            banner.style.setProperty('--gradient', `linear-gradient(90deg, ${document.body.attributes['data-rainbow-banner-colors'].value})`)
            banner.classList.add('rainbow-banner')

            navEl.after(banner)
        }
    }
})()