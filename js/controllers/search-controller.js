const tags = [
    { tag: 'happy', count: 0 },
    { tag: 'sad', count: 0 },
    { tag: 'angry', count: 0 },
]

function doSearch(value) {
    const searchEl = document.querySelector('#search')
    searchEl.value = value
    if (value.length) {
        const tag = tags.find((t) => t.tag === value)
        if (tag) {
            tag.count++
        } else {
            tags.push({ tag:value, count: 1 })
        }
    }
    onSearch(value)
    renderTags()
}

function renderTags() {
    const tagsEl = document.querySelector('.most-searched-keys')
    tagsEl.innerHTML = tags.map((tag) => (`
        <li class="clean-list" style="font-size: ${16 + tag.count}px;">
            <a href="#" onclick="doSearch('${tag.tag}')">${tag.tag}</a>
        </li>
    `)).join('\n')
}

function debounced() {
    let timeout = null
    return (value) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            doSearch(value)
        }, 1000)
    }
}

const debouncedSearch = debounced()

function onSearch(value) {
    if (value) {
        renderSearchedItems(value)
    } else {
        renderGallery()
    }
}