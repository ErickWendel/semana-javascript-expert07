export const extraHorizontalCaptureAreaInPixels = 600

export default class Camera {
  constructor() {
    this.video = document.createElement('video')
  }

  static async init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        `Browser API navigator.mediaDevices.getUserMedia not available`
      )
    }
    const videoConfig = {
      audio: false,
      video: {
        width: globalThis.screen.availWidth + extraHorizontalCaptureAreaInPixels,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60
        },
        transform: `translate(-${extraHorizontalCaptureAreaInPixels}px)`
      }
    }
    const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
    const camera = new Camera()
    camera.video.srcObject = stream
    // debug reasons!
    // camera.video.height = 240
    // camera.video.width = 320
    // document.body.append(camera.video)

    // aguarda pela camera!
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video)
      }
    })

    camera.video.play()

    return camera
  }
}