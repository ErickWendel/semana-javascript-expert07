export default class Camera {
  constructor() {
    this.video = document.createElement('video')
  }

  static async getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  // Adicionado após às aulas para facilitar a configuração da câmera
  static async getDeviceId() {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    if (permissionStatus.state === 'denied') {
      alert("Camera permission was denied. Please enable it in your browser settings and reload the page.");
      throw new Error("Camera permission was denied.")
    }
    const devices = await Camera.getDevices();
    if (permissionStatus.state === 'granted' &&
      !window.location.href.includes('/titles')
    ) {
      return devices[0]?.deviceId
    }

    const deviceId = prompt("Type the number of the webcam below:\n" + devices.map((device, i) => `${i}: ${device.label}`).join("\n"));
    if (deviceId !== '0' && !deviceId) {
      alert("No device selected, try again!");
      return Camera.getDeviceId()
    }
    const device = devices[deviceId]?.deviceId;
    if (deviceId !== '0' && !device) {
      alert("Invalid device ID, try again!");
      return Camera.getDeviceId()
    }

    return device
  }

  static async init() {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        `Browser API navigator.mediaDevices.getUserMedia not available`
      )
    }

    const deviceId = await Camera.getDeviceId()
    const videoConfig = {
      audio: false,
      video: {
        deviceId,
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60
        }
      }
    }
    const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
    const camera = new Camera()
    camera.video.srcObject = stream
    // debug reasons!
    camera.video.height = 240
    camera.video.width = 320
    document.body.append(camera.video)

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