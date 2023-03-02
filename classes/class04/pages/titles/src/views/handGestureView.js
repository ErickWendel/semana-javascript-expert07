export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')
  #fingerLookupIndexes
  #styler
  constructor({ fingerLookupIndexes, styler }) {
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight
    this.#fingerLookupIndexes = fingerLookupIndexes
    this.#styler = styler
    
    //  carrega os estilos assincronamente (evitar travar a tela enquanto carrega)
    setTimeout(() => styler.loadDocumentStyles(), 200);
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue

      this.#canvasContext.fillStyle = handedness === "Left" ? "rgb(44, 212, 103)" : "rgb(44, 212, 103)"
      this.#canvasContext.strokeStyle = "white"
      this.#canvasContext.lineWidth = 8
      this.#canvasContext.lineJoin = "round"

      // juntas
      this.#drawJoients(keypoints)
      // dedos
      this.#drawFingersAndHoverElements(keypoints)
    }
  }
  
  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y)
    if(!element) return;
    
    const rect = element.getBoundingClientRect()
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y
    })

    element.dispatchEvent(event)
  }

  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath()
      const newX = x - 2
      const newY = y - 2
      const radius = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
      this.#canvasContext.fill()
    }
  }
  #drawFingersAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes)
    for (const finger of fingers) {
      const points = this.#fingerLookupIndexes[finger].map(
        index => keypoints[index]
      )
      const region = new Path2D()
      // [0] é a palma da mao (wrist)
      const [{ x, y }] = points
      region.moveTo(x, y)
      for(const point of points) {
        region.lineTo(point.x, point.y)
      }
      this.#canvasContext.stroke(region)
      this.#hoverElement(finger, points)
    }
  }

  #hoverElement(finger, points) {
    if(finger !== "indexFinger") return
    const tip = points.find(item => item.name === "index_finger_tip")
    const element = document.elementFromPoint(tip.x, tip.y)
    if(!element) return;
    const fn = () => this.#styler.toggleStyle(element, ':hover')
    fn()
    
    setTimeout(() => fn(), 500);
  }

  loop(fn) {
    requestAnimationFrame(fn)
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: "smooth"
    })
  }

}