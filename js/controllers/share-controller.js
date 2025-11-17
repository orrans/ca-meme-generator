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
