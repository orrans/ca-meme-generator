'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    const elMemeImg = new Image()
    elMemeImg.src = img.url

    elMemeImg.onload = () => {
        gCtx.drawImage(elMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[0], gElCanvas.width / 2, 50)
    }
}

function drawText(line, x, y) {
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onSetLineTxt(ev) {
    const newTxt = ev.target.value
    setLineTxt(newTxt)
    renderMeme()
}
