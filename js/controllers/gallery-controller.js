'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery')

    let elHtml = ''
    const memeImgs = getImgs()
    memeImgs.forEach((img) => {
        elHtml += `<img src="${img.url}" onClick="onSelectMeme(${img.id})"/>`
    })

    elGallery.innerHTML = elHtml
}

function onSelectMeme(id) {
    setImg(id)
    const elGalleryPage = document.querySelector('.meme-gallery-page')
    const elEditPage = document.querySelector('.meme-edit-page')
    elGalleryPage.style.display = 'none'
    elEditPage.style.display = 'block'
    renderMeme()
}

