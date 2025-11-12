'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gCtx)
    renderMeme(1) // test, need to delete after it
}

function renderMeme() {
    const meme = getMeme()
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeImg = new Image()
    elMemeImg.src = meme.img.url
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
    elMemeImg.onload = function () {
        resizeCanvasToImageSize(elMemeImg)
        gCtx.drawImage(elMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTopText(meme.lines[0].txt, meme.lines[0])
    }
}

function drawTopText(txt, line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    const x = gElCanvas.width / 2
    const y = 10

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function resizeCanvasToImageSize(img) {
    const maxWidth = 500
    const maxHeight = 500

    const imgRatio = img.naturalWidth / img.naturalHeight

    let newWidth = img.naturalWidth
    let newHeight = img.naturalHeight

    if (newWidth > maxWidth) {
        newWidth = maxWidth
        newHeight = newWidth / imgRatio
    }

    if (newHeight > maxHeight) {
        newHeight = maxHeight
        newWidth = newHeight * imgRatio
    }

    gElCanvas.width = newWidth
    gElCanvas.height = newHeight
}
