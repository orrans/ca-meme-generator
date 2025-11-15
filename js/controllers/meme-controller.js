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
        const lines = meme.lines
        gCtx.drawImage(elMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
        let i = 50
        lines.forEach((line) => {
            drawText(line, gElCanvas.width / 2, i)
            i += 50
        })
    }
}

function drawText(line, x, y) {
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onAddLine() {
    const elInput = document.querySelector('[name="meme-text"]')
    addLine()
    const meme = getMeme()
    let line = meme.lines.length - 1
    drawText(line, gElCanvas.height / 2, 50)
    elInput.value = ''
    renderMeme()
}

function onDeleteLine() {}

function onSwitchLine() {
    const meme = getMeme()
    const elInput = document.querySelector('[name="meme-text"]')
    meme.lines[meme.selectedLineIdx].txt = elInput.value
    meme.selectedLineIdx++
    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = 0
    }
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.focus()
    renderMeme()
}

function onSetLineTxt(ev) {
    const newTxt = ev.target.value
    setLineTxt(newTxt)
    renderMeme()
}

function onDownloadMeme(eLink) {
    const dataUrl = gElCanvas.toDataURL()
    eLink.href = dataUrl
    eLink.download = 'my-meme'
}

function onSetColor() {
    const color = document.querySelector('.color-pick').value
    setColor(color)
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}
