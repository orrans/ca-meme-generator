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

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(diff) {
    const line = gMeme.lines[gMeme.selectedLineIdx]

    let newSize = line.size + diff
    if (newSize < 10) newSize = 10
    if (newSize > 150) newSize = 150

    line.size = newSize
}

function addLine() {
    gMeme.lines.push({
        txt: 'Add text here',
        size: 20,
        color: '#ffffff',
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}
