import { prepareRunChecker } from "../../../../lib/shared/util.js";
const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 });
const { shouldRun: clickShouldRun } = prepareRunChecker({ timerDelay: 300 });

export default class HandGestureController {
  #view;
  #service;
  #camera;
  #lastDirection = {
    direction: "",
    y: 0,
  };
  constructor({ camera, view, service }) {
    this.#view = view;
    this.#service = service;
    this.#camera = camera;
  }

  async init() {
    return this.#loop();
  }

  #scrollPage(direction) {
    const pixelPerScroll = 100;
    if (this.#lastDirection.direction === direction) {
      this.#lastDirection.y =
        direction === "scroll-down"
          ? this.#lastDirection.y + pixelPerScroll
          : this.#lastDirection.y - pixelPerScroll;
    } else {
      this.#lastDirection.direction = direction;
    }

    if (this.#lastDirection.y < 0) this.#lastDirection.y = 0;

    console.log(this.#lastDirection.y);
    this.#view.scrollPage(this.#lastDirection.y);
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);
      this.#view.clearCanvas();
      if (hands?.length) this.#view.drawResults(hands);
      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        if (event === "click") {
          if (!clickShouldRun()) continue;
          this.#view.clickOnElement(x, y);
          continue;
        }
        if (event.includes("scroll")) {
          if (!scrollShouldRun()) continue;
          this.#scrollPage(event);
        }
      }
    } catch (error) {
      console.error("deu ruim**", error);
    }
  }

  async #loop() {
    // console.log("y", this.#lastDirection.y);
    await this.#service.initializeDetector();
    this.#estimateHands();
    this.#view.loop(this.#loop.bind(this));
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}
