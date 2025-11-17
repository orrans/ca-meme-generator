function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    initTags()
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

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    document.querySelector('nav').classList.toggle('nav-open')
}

function closeMenu() {
    document.body.classList.remove('menu-open')
    document.querySelector('nav').classList.remove('nav-open')
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('mouseout', onMouseOut)
}
// take it to the bottom of the file
function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}