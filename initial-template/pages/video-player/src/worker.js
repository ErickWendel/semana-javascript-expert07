import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"
import Service from "./service.js"
// // //Para usar as referencias globais na thread principal, usa-se window
// // //Para usá-las no worker, que é uma thread secundária, usa-se self
const {tf, faceLandmarksDetection} = self
tf.setBackend('webgl')
const service = new Service({
    faceLandmarksDetection
})
console.log('loading tf model')
await service.loadModel()
console.log('tf model loaded')
postMessage('READY')

onmessage = async ({data: video}) => {
    const blinked = await service.handBlinked(video)
    if(!blinked) return
    postMessage({blinked})
}