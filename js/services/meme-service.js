'use strict'

var gImgs = [
    { id: 1, url: 'img/square-ratio/1.jpg', keywords: ['politics', 'trump', 'angry', 'man'] },
    { id: 2, url: 'img/square-ratio/2.jpg', keywords: ['dog', 'puppy', 'cute', 'animal', 'kiss'] },
    {
        id: 3,
        url: 'img/square-ratio/3.jpg',
        keywords: ['baby', 'dog', 'puppy', 'cute', 'animal', 'sleep'],
    },
    {
        id: 4,
        url: 'img/square-ratio/4.jpg',
        keywords: ['cat', 'sleep', 'animal', 'cute', 'keyboard'],
    },
    {
        id: 5,
        url: 'img/square-ratio/5.jpg',
        keywords: ['baby', 'success', 'kid', 'win', 'beach', 'funny'],
    },
    {
        id: 6,
        url: 'img/square-ratio/6.jpg',
        keywords: ['aliens', 'history channel', 'man', 'funny', 'explain'],
    },
    {
        id: 7,
        url: 'img/square-ratio/7.jpg',
        keywords: ['baby', 'surprised', 'shocked', 'funny', 'kid'],
    },
    {
        id: 8,
        url: 'img/square-ratio/8.jpg',
        keywords: ['willy wonka', 'sarcastic', 'man', 'movie'],
    },
    {
        id: 9,
        url: 'img/square-ratio/9.jpg',
        keywords: ['baby', 'evil', 'laughing', 'funny', 'scheming', 'kid'],
    },
    {
        id: 10,
        url: 'img/square-ratio/10.jpg',
        keywords: ['politics', 'obama', 'laughing', 'happy', 'man'],
    },
    {
        id: 11,
        url: 'img/square-ratio/11.jpg',
        keywords: ['basketball', 'kiss', 'nba', 'funny', 'awkward'],
    },
    {
        id: 12,
        url: 'img/square-ratio/12.jpg',
        keywords: ['man', 'pointing', 'serious', 'celebrity'],
    },
    {
        id: 13,
        url: 'img/square-ratio/13.jpg',
        keywords: ['leonardo dicaprio', 'cheers', 'gatsby', 'movie', 'man', 'smile'],
    },
    {
        id: 14,
        url: 'img/square-ratio/14.jpg',
        keywords: ['morpheus', 'matrix', 'movie', 'man', 'serious'],
    },
    {
        id: 15,
        url: 'img/square-ratio/15.jpg',
        keywords: ['boromir', 'lord of the rings', 'movie', 'man', 'one does not simply'],
    },
    {
        id: 16,
        url: 'img/square-ratio/16.jpg',
        keywords: ['picard', 'star trek', 'facepalm', 'man', 'smile', 'shy'],
    },
    {
        id: 17,
        url: 'img/square-ratio/17.jpg',
        keywords: ['putin', 'politics', 'russia', 'man', 'serious'],
    },
    {
        id: 18,
        url: 'img/square-ratio/18.jpg',
        keywords: ['buzz lightyear', 'woody', 'toy story', 'movie', 'cartoon', 'everywhere'],
    },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 20,
            color: '#ffffff',
            x: undefined,
            y: undefined,
            isDrag: false,
            align: 'center',
            font: 'impact',
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
        x: undefined,
        y: undefined,
        isDrag: false,
        align: 'center',
        font: 'impact',
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length > 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    } else {
        gMeme.selectedLineIdx = 0
    }
}

function setLineDrag(isDrag) {
    if (!gMeme.lines.length) return
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.isDrag = isDrag
}

function moveLine(lineX, lineY) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.x += lineX
    line.y += lineY
}

function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}

function moveLineVertical(lineY) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].y += lineY
}

function getSelectedLine() {
    if (!gMeme.lines.length) return null
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineAlign(align) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setLineFont(fontFamily) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
}
