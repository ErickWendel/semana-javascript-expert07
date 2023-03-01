export default class Camera{
    constructor(){
        //cria um elemento HTML de video
        this.video = document.createElement('video')
    }

    static async init(){
        //testa se o navegador suporta o JS que pega a webcam
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia is not available'
            )
        }

        //configurações do que eu vou pedir permissão pra usar
        const videoConfig = {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 60
                }
            }
        }
        console.log('Vou pedir uma câmera')
        //objeto que eu vou pedir para o navegador liberar
        const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
        console.log('Consegui a camera')
        //pega um objeto video que é criado ali em cima, sempre que a função é chamada
        const camera = new Camera()

        //Empurra o objeto de mídia que pedi pro browser dentro do elemento HTML vídeo
        camera.video.srcObject = stream
        camera.video.height = 240
        camera.video.width = 320

        //Adiciona esse elemento HTML ao DOM
        document.body.append(camera.video)

        //só inicia a transmissão quando o navegador me devolver o objeto de mídia que eu pedi
        await new Promise((resolve)=>{
            camera.video.onloadedmetadata = () => {
                resolve(camera.video)
            }
        })

        //tudo montado, executa o vídeo
        camera.video.play()
        return camera
    }
}