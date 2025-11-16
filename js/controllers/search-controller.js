'use strict'
let gTopTags = []
const tags = [
    { tag: 'funny', count: 12 },
    { tag: 'cat', count: 16 },
    { tag: 'baby', count: 2 },
]

function initTags() {
    const sortedTags = tags.sort((a, b) => b.count - a.count)
    gTopTags = sortedTags.slice(0, 5)
    renderTags()
}

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
}

function doSearch(value) {
    const searchEl = document.querySelector('#search')
    searchEl.value = value
    onSearch(value)

    const tagInTags = tags.find((t) => t.tag === value)
    if (tagInTags) {
        tagInTags.count++
    } else {
        tags.push({ tag: value, count: 1 })
    }

    const tagInTopTags = gTopTags.find((t) => t.tag === value)
    if (tagInTopTags) {
        tagInTopTags.count++
    }

    renderTags()
}

function renderTags() {
    const tagsEl = document.querySelector('.most-searched-keys')

    tagsEl.innerHTML = gTopTags
        .map((tag) => {
            const fontSize = Math.min(12 + tag.count, 32)

            return `
        <li class="clean-list" style="font-size: ${fontSize}px;">
            <a href="#" onclick="doSearch('${tag.tag}')">${tag.tag}</a>
        </li>
    `
        })
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

const debouncedUpdateTags = debounced((value) => {
    updateTags(value)
    initTags()
}, 1000)

function onSearch(value) {
    if (value) {
        renderSearchedItems(value)
    } else {
        renderGallery()
    }
}
