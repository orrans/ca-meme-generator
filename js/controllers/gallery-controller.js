'use strict'

function renderGallery() {
    renderGalleryItems(getImgs())
}

function renderGalleryItems(items) {
    const elGallery = document.querySelector('.meme-gallery')

    let elHtml = `  <div class="upload-image flex align-center justify-center">
                        <i class="fa-solid fa-upload"></i>
                        Upload image
                    </div>
                    `
    items.forEach((img) => {
        elHtml += `<img src="${img.url}" onClick="onSelectMeme(${img.id})"/>`
    })

    elGallery.innerHTML = elHtml
}

function renderSearchedItems(search) {
    const items = getImgs().filter((i) => i.keywords.some((kw) => kw.toLowerCase().includes(search.toLowerCase())))
    renderGalleryItems(items)
}

function onSelectMeme(id) {
    setImg(id)
    const elGalleryPage = document.querySelector('.meme-gallery-page')
    const elEditPage = document.querySelector('.meme-edit-page')
    elGalleryPage.classList.add('hidden')
    elEditPage.classList.remove('hidden')
    renderMeme()
}
