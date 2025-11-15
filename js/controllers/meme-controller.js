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
        const selectedIdx = meme.selectedLineIdx
        gCtx.drawImage(elMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const x = gElCanvas.width / 2
        lines.forEach((line, idx) => {
            const isSelected = idx === selectedIdx
            let y

            if (idx === 0) {
                y = 50
            } else if (idx === 1) {
                y = gElCanvas.height - 50
            } else {
                const lineOffset = (idx - 2) * 15
                y = gElCanvas.height / 2 + lineOffset
            }

            drawText(line, x, y, isSelected)
        })
    }
}

function drawText(line, x, y, isSelected = false) {
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}px Impact`

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)

    if (isSelected) {
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size

        const rectX = x - textWidth / 2 - 10
        const rectY = y - textHeight / 2 - 10
        const rectWidth = textWidth + 20
        const rectHeight = textHeight + 20

        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 5
        gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)

        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        gCtx.lineWidth = 3
        gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
    }
}

function onAddLine() {
    const elInput = document.querySelector('[name="meme-text"]')
    addLine()
    const meme = getMeme()
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.focus()
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
