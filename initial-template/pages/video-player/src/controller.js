export default class Controller {
  #view
  #camera
  #worker
  #blinkCounter = 0
  constructor({ view, worker, camera }) {
    this.#view = view
    this.#worker = this.#configureWorker(worker);
    this.#camera = camera
    this.#view.configBtnClick(this.onBtnStart.bind(this))
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
    controller.log(`not yet detecting eye blink! click in the button to start`)
    return controller.init()
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if (`READY` === data) {
        console.log(`Worker is ready`)
        this.#view.enableButton();
        ready = true;
        return;
      }
      const blinked = data.blinked
      this.#blinkCounter += blinked
      console.log({ blinked })
      this.#view.togglePlayVideo()
    }
    return {
      send (msg) {
        if (!ready) return;
        worker.postMessage(msg)
      }
    }
  }

  async init() {
    console.log('init')
  }

  loop() {
    const video = this.#camera.video
    const img = this.#view.getVideoFrame(video)
    this.#worker.send(img)
    this.log(`detecting eye blink`)
    setInterval(() => this.loop(), 100)
  }

  log(text) {
    const times = ` - blinked times: ${this.#blinkCounter}`
    this.#view.log(`log: ${text}`.concat(this.#blinkCounter ? times : ``))
  }

  onBtnStart() {
    this.log(`initializing detection...`)
    this.#blinkCounter = 0
    this.loop()
  }
}