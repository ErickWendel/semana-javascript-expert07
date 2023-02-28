
export default class CardsView {
  #browseSearchList = document.getElementById('browseSearch')
  #inputSearch = document.getElementById('inputSearch')
  #searchTitleBar = document.getElementById('searchTitleBar')

  clearCards() {
    Array.from(this.#browseSearchList.children).forEach(c => c.remove())
  }

  configureOnSearchInput(fn) {
    this.#inputSearch.value = ''
    this.#inputSearch.addEventListener('input', (event) => {
      const target = event.target
      target.disabled = true
      fn(target.value)
      target.disabled = false
      this.#inputSearch.focus()
    })
  }

  updateSearchTitleBarTotal(total) {
    this.#searchTitleBar.innerText = `BROWSE SEARCH (${total})`
  }

  addCards(cards, itemsPerLine) {
    window.AddCardsOnBrowseSearchGrid({
      cards,
      itemsPerLine
    })

    this.updateSearchTitleBarTotal(cards.length)
  }

}