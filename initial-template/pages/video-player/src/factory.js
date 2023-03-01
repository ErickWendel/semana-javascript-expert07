import Controller from "./controller.js"
import Service from "./service.js"
import View from "./view.js"
import Camera from "../../../libs/shared/camera.js"
import {supportWorkerType} from "../../../libs/shared/util.js"

async function getWorker(){
    if (supportWorkerType()){     
        const worker = new Worker('./src/worker.js', {type: 'module'})
        console.log('suporta ações de mídia!')
        return worker
    } 

    const workerMock = {
        async postMessage() {},
        onmessage(msg) {}
    }
    console.log('Não suporta ações de mídia!')
    return workerMock
}

const worker = await getWorker()
worker.postMessage('hey from factory')

const camera = await Camera.init()
const [rootPath] = window.location.href.split('/pages/')
const factory = {
    async initialize(){
        return Controller.initialize({
            view: new View(),
            camera,
            worker
        })        
    }
}

export default factory