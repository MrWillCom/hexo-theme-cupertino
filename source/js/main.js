(() => {
    var navEl = document.getElementById("theme-nav");
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
})()