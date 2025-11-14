'use strict'

var gImgs = [
    { id: 1, url: 'img/square-ratio/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/square-ratio/2.jpg', keywords: ['baby', 'funny'] },
    { id: 3, url: 'img/square-ratio/3.jpg', keywords: ['dog', 'cute'] },
    { id: 4, url: 'img/square-ratio/4.jpg', keywords: ['funny', 'baby'] },
    { id: 5, url: 'img/square-ratio/5.jpg', keywords: ['cat', 'cute'] },
    { id: 6, url: 'img/square-ratio/6.jpg', keywords: ['funny', 'dog'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 20,
            color: '#ffffff',
        },
    ],
}

// demo search count for first load
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
    return gMeme
}

function getImgById(imgId) {
    return gImgs.find((img) => img.id === imgId)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgs() {
    return gImgs
}

function onSetColor() {
    const color = document.querySelector('.color-pick').value
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function onChangeFontSize(size) {
    const CurrFontSize = gMeme.lines[gMeme.selectedLineIdx].size
    console.log(CurrFontSize)
    if (CurrFontSize < 10) gMeme.lines[gMeme.selectedLineIdx].size = 10
    gMeme.lines[gMeme.selectedLineIdx].size += size
    renderMeme()
}
