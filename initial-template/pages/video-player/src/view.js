export default class View {
  #btnInit = document.querySelector(`#init`)
  #statusElem = document.querySelector(`#status`)
  
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