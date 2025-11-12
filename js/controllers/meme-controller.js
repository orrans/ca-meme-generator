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
    const elMemeImg = new Image()
    elMemeImg.src = meme.img.url
    elMemeImg.onload = function () {
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
