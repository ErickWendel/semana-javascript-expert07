export default class CardsController {
  #itemsPerLine = 5
  #view
  #service
  constructor({ view, service }) {
    this.#view = view
    this.#service = service
  }

  async #loadDB() {
    return this.#service.loadCards()
  }

  addCards(keyword) {
    const cards = this.#service.filterTitles(keyword)
    const totalCards = cards.length

    if (!totalCards) {
      this.#view.updateSearchTitleBarTotal(totalCards)
      return
    }

    this.#view.addCards(cards, this.#itemsPerLine)
  }

  #onSearchInput(keyword) {
    this.#view.clearCards()
    this.addCards(keyword)
  }

  async init() {
    await this.#loadDB()
    this.#view.configureOnSearchInput(
      this.#onSearchInput.bind(this)
    )

    this.addCards("")
  }

  static async initialize(deps) {
    const controller = new CardsController(deps)
    return controller.init()
  }
}