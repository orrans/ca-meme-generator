'use strict'

const tags = [
    { tag: 'funny', count: 12 },
    { tag: 'cat', count: 16 },
    { tag: 'baby', count: 2 },
]

function onSearchInput(value) {
    onSearch(value)
    debouncedUpdateTags(value)
}

function updateTags(value) {
    if (value.length) {
        const tag = tags.find((t) => t.tag === value)
        if (tag) {
            tag.count++
        } else {
            tags.push({ tag: value, count: 1 })
        }
    }
    renderTags()
}

function doSearch(value) {
    const searchEl = document.querySelector('#search')
    searchEl.value = value
    updateTags(value)
    onSearch(value)
}

function renderTags() {
    const tagsEl = document.querySelector('.most-searched-keys')

    const sortedTags = tags.sort((a, b) => b.count - a.count)
    const top5Tags = sortedTags.slice(0, 5)

    tagsEl.innerHTML = top5Tags
        .map(
            (tag) => `
        <li class="clean-list" style="font-size: ${16 + tag.count}px;">
            <a href="#" onclick="doSearch('${tag.tag}')">${tag.tag}</a>
        </li>
    `
        )
        .join('\n')
}

function debounced(func, delay) {
    let timeout = null
    return (value) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func(value)
        }, delay)
    }
}

const debouncedUpdateTags = debounced(updateTags, 1000)

function onSearch(value) {
    if (value) {
        renderSearchedItems(value)
    } else {
        renderGallery()
    }
}
