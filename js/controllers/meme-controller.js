'use strict'

let gElCanvas
let gCtx
var gStartPos
let gElCurrMemeImg

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    renderTags()
    initTags()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('mouseout', onMouseOut)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    const elMemeImg = new Image()
    elMemeImg.src = img.url

    elMemeImg.onload = function () {
        gElCurrMemeImg = elMemeImg
        const lines = meme.lines
        const selectedIdx = meme.selectedLineIdx

        gCtx.drawImage(elMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)

        lines.forEach(function (line, idx) {
            const isSelected = idx === selectedIdx

            if (line.x === undefined) {
                line.x = gElCanvas.width / 2

                if (idx === 0) {
                    line.y = 50
                } else if (idx === 1) {
                    line.y = gElCanvas.height - 50
                } else {
                    line.y = gElCanvas.height / 2 + (idx - 2) * 20
                }
            }

            drawText(line, line.x, line.y, isSelected)
        })
    }
}

function drawText(line, x, y, isSelected = false) {
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}px ${line.font}`

    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)

    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size

    var rectX
    if (line.align === 'left') {
        rectX = x - 10
    } else if (line.align === 'center') {
        rectX = x - textWidth / 2 - 10
    } else if (line.align === 'right') {
        rectX = x - textWidth - 10
    }

    const rectY = y - textHeight / 2 - 10
    const rectWidth = textWidth + 20
    const rectHeight = textHeight + 20

    line.bounds = { x: rectX, y: rectY, width: rectWidth, height: rectHeight }

    if (isSelected) {
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

function onDeleteLine() {
    deleteLine()
    renderMeme()
    updateEditorForSelectedLine()
}

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
    updateEditorForSelectedLine()
    renderMeme()
}

function onSetLineTxt(ev) {
    const newTxt = ev.target.value
    setLineTxt(newTxt)
    renderMeme()
}

function onDownloadMeme(eLink) {
    const meme = getMeme()
    gCtx.drawImage(gElCurrMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach(function (line) {
        drawText(line, line.x, line.y, false)
    })
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    eLink.href = imgContent
    renderMeme()
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

function onDown(ev) {
    const pos = getEvPos(ev)
    const clickedLineIndex = getClickedLineIdx(pos)

    if (clickedLineIndex === -1) return

    setSelectedLine(clickedLineIndex)
    updateEditorForSelectedLine()
    renderMeme()

    setLineDrag(true)
    gStartPos = pos
    gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
    var meme = getMeme()
    if (!meme.lines.length) return

    var selectedLine = meme.lines[meme.selectedLineIdx]

    if (selectedLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    } else {
        const pos = getEvPos(ev)
        const hoveredLineIdx = getClickedLineIdx(pos)
        if (hoveredLineIdx !== -1) {
            gElCanvas.style.cursor = 'grab'
        } else {
            gElCanvas.style.cursor = 'default'
        }
    }
}

function onUp(ev) {
    setLineDrag(false)

    const pos = getEvPos(ev)
    const hoveredLineIdx = getClickedLineIdx(pos)

    if (hoveredLineIdx !== -1) {
        gElCanvas.style.cursor = 'grab'
    } else {
        gElCanvas.style.cursor = 'default'
    }
}

function onMouseOut() {
    setLineDrag(false)
    gElCanvas.style.cursor = 'default'
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getClickedLineIdx(pos) {
    var lines = getMeme().lines
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        if (isLineClicked(pos, line)) {
            return i
        }
    }
    return -1
}

function isLineClicked(clickPos, line) {
    if (!line.bounds) return false

    const { x, y, width, height } = line.bounds
    return clickPos.x >= x && clickPos.x <= x + width && clickPos.y >= y && clickPos.y <= y + height
}

function updateEditorForSelectedLine() {
    const elInput = document.querySelector('[name="meme-text"]')
    const elColorPick = document.querySelector('.color-pick')
    const elFontPick = document.querySelector('.font-picker')
    const selectedLine = getSelectedLine()

    if (!selectedLine) {
        elInput.value = ''
        elColorPick.value = '#ffffff'
        elFontPick.value = 'impact'
        return
    }
    elInput.value = selectedLine.txt
    elColorPick.value = selectedLine.color
    elFontPick.value = selectedLine.font
}

function onAlignText(align) {
    setLineAlign(align)
    const line = getSelectedLine()
    if (!line) return
    if (align === 'left') {
        line.x = 25
    } else if (align === 'center') {
        line.x = gElCanvas.width / 2
    } else if (align === 'right') {
        line.x = gElCanvas.width - 25
    }
    renderMeme()
}

function onMoveLine(offset) {
    moveLineVertical(offset)
    renderMeme()
}

function onSetFont(elSelect) {
    const fontFamily = elSelect.value
    setLineFont(fontFamily)
    renderMeme()
}

function onBackToHomepage() {
    const homePage = document.querySelector('.meme-gallery-page')
    const galleryEl = document.querySelector('.gallery')
    galleryEl.classList.add('active')
    if (!homePage.classList.contains('hidden')) return
    homePage.classList.remove('hidden')
    document.querySelector('.meme-edit-page').classList.add('hidden')
    closeMenu()
}

function onShareImg(ev) {
    ev.preventDefault()
    const meme = getMeme()
    gCtx.drawImage(gElCurrMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach(function (line) {
        drawText(line, line.x, line.y, false)
    })
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        )
    }
    uploadImg(canvasData, onSuccess)
}

// on submit call to this function

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)
    } catch (err) {
        console.log(err)
    }
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    document.querySelector('nav').classList.toggle('nav-open')
}

function closeMenu() {
    document.body.classList.remove('menu-open')
    document.querySelector('nav').classList.remove('nav-open')
}
