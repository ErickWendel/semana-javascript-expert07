import { prepareRunChecker } from "../../../../lib/shared/util.js"

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 })
const { shouldRun: clickShouldRun } = prepareRunChecker({ timerDelay: 300 })
export default class HandGestureController {
  #view
  #service
  #camera
  #lastDirection = {
    direction: '',
    y: 0
  }

  constructor({ view, service, camera }) {
    this.#service = service
    this.#view = view
    this.#camera = camera
  }
  async init() {
    return this.#loop()
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 100
    if (this.#lastDirection.direction === direction) {
      this.#lastDirection.y = (
        direction === 'scroll-down' ?
          this.#lastDirection.y + pixelsPerScroll :
          this.#lastDirection.y - pixelsPerScroll
      )
    }
    else {
      this.#lastDirection.direction = direction
    }

    this.#view.scrollPage(this.#lastDirection.y)

  }
  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video)
      this.#view.clearCanvas()

      if (hands?.length) this.#view.drawResults(hands)

      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        if (event === 'click') {
          if (!clickShouldRun()) continue
          this.#view.clickOnElement(x, y)

          continue
        }

        if (event.includes('scroll')) {
          if (!scrollShouldRun()) continue
          this.#scrollPage(event)
        }
      }

    } catch (error) {
      console.error('deu ruim**', error)
    }
  }

  async #loop() {
    await this.#service.initializeDetector()
    await this.#estimateHands()
    this.#view.loop(this.#loop.bind(this))

  }
  static async initialize(deps) {
    const controller = new HandGestureController(deps)
    return controller.init()
  }
}