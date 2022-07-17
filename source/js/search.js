(() => {
    var searchIndex = []
    const searchForm = document.getElementById('search-form')
    const searchBox = document.getElementById('searchbox')
    const searchResults = document.getElementById('search-results')

    searchBox.select()

    const doSearch = (keyword) => {
        var results = []
        var resultsEl = []

        for (let i = 0; i < searchIndex.length; i++) {
            const currentItem = searchIndex[i];

            if (JSON.stringify(currentItem).search(keyword) !== -1) {
                results.push(currentItem)
            }
        }

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                const currentResult = results[i];
                const currentResultEl = document.createElement('article')
                currentResultEl.classList.add('post-list-item')
                currentResultEl.innerHTML = `
<a href="${currentResult.url}">
    <div class="content">
        ${(() => {
                        if (currentResult.categories) {
                            return `<div class="categories${document.body.attributes['data-uppercase-categories'].value ? ' text-uppercase' : ''}">${(() => {
                                let categories = ''
                                for (let i = 0; i < currentResult.categories.length; i++) {
                                    const currentCategory = currentResult.categories[i]
                                    categories += `<span>${currentCategory}</span>`
                                }
                                return categories
                            })()}</div>`
                        } else {
                            return ''
                        }
                    })()}
        <div class="title">${currentResult.title}</div>
    </div>
</a>
                `
                resultsEl.push(currentResultEl)
            }
        } else {
            const el = document.createElement('div')
            el.className = 'no-results'
            el.innerHTML = 'No results found.'
            resultsEl.push(el)
        }

        searchResults.innerHTML = ''
        for (let i = 0; i < resultsEl.length; i++) {
            const element = resultsEl[i];
            searchResults.appendChild(element)
        }
    }

    searchForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        if (searchIndex != '') {
            doSearch(searchBox.value)
        } else {
            fetch(document.body.attributes['data-config-root'].value + document.body.attributes['data-search-path'].value).then(res => res.json()).then(data => {
                searchIndex = data
                doSearch(searchBox.value)
            })
        }
    })
})()