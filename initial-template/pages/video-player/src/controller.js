export default class Controller{
    #view
    #worker
    #camera
    #blinkCounter = 0
    constructor({view, worker, camera}){
        this.#view = view
        this.#camera = camera
        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
        this.#worker = this.#configureWorker(worker)
    }

    #configureWorker(worker) {
        let ready = false
        worker.onmessage = ({data}) =>{
            console.log('recebi no controller',data)
            if(data === 'READY'){
                this.#view.enableButton()
                ready = true
                return
            }
            const blinked = data.blinked            
            console.log('blinked',blinked) 
            if(blinked){
                this.#blinkCounter += blinked
                this.#view.tooglePlayVideo()
                this.log()
            }
        }

        return {
            send (msg) {
                if(!ready) return
                worker.postMessage(msg)
            }
        }
    }

    static async initialize(deps){
        const controller = new Controller(deps)
        controller.log('not yet detecting eyes')
        return controller.init()
    }

    async init(){
        console.log('Estou funcioando')
    }

    loop(){
        const video = this.#camera.video
        const img = this.#view.getVideoFrame(video)
        this.#worker.send(img)
        this.log('detecting eye blink')

        setTimeout(()=> this.loop(), 100)
    }

    log(text){
        const times = `         - blinked times: ${this.#blinkCounter}`
        this.#view.log(`status:${text}`.concat(this.#blinkCounter? times :""))
    }

    onBtnStart(){
        this.log('Initializing face detection...')
        this.#blinkCounter = 0
        this.loop()
    }
}