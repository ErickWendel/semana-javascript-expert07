import CardsController from "./../controllers/cardsController.js"
import CardsView from "./../views/cardsView.js"
import CardsService from "./../services/cardsService.js"
const [rootPath] = window.location.href.split('/pages/')
const factory = {
  async initalize() {
    return CardsController.initialize({
      view: new CardsView(),
      service: new CardsService({ dbUrl: `${rootPath}/assets/database.json` })
    })
  }
}

export default factory