export default class View {
  #btnInit = document.querySelector(`#init`)
  #statusElem = document.querySelector(`#status`)
  #videoFrameCanvas = document.createElement(`canvas`)
  #canvasContext = this.#videoFrameCanvas.getContext(`2d`, { willReadFrequently: true })

  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas
    const [width, height] = [video.videoWidth, video.videoHeight]
    canvas.width = width
    canvas.height = height
    this.#canvasContext.drawImage(video, 0, 0, width, height)
    return this.#canvasContext.getImageData(0, 0, width, height)
  }

  enableButton() {
    this.#btnInit.disabled = false;
  }

  configBtnClick(fn) {
    this.#btnInit.addEventListener(`click`, fn)
  }

  log(text) {
    this.#statusElem.innerHTML = text
  }
}