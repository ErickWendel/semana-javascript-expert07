- Curso oficial do google sobre Machine Learning for Web Developers (Web ML): https://youtube.com/playlist?list=PLOU2XLYxmsILr3HQpqjLAUkIPa5EaZiui
- Projetos feitos com TensorFlow: https://youtube.com/playlist?list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw
- Treinando ML no Google: https://teachablemachine.withgoogle.com/

## Aula01
- Codigo do Calculo: https://github.com/monaca-samples/blink-to-text/blob/f3d578ff641298913833b04e98e854bf1cfe38e1/src/js/blinkPrediction.js
- Dependencias do worker.js
```js
    import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
    import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
    import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
    import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"
```
- base de dados usada: https://www.kaggle.com/code/vikassingh1996/netflix-movies-and-shows-plotly-recommender-sys/data
- Converter video para canvas: https://stackoverflow.com/questions/64249599/how-to-run-handpose-tfjs-model-in-web-worker
- blog tensorflow sobre deteccao de iris: https://blog.tensorflow.org/2020/11/iris-landmark-tracking-in-browser-with-MediaPipe-and-TensorFlowJS.html
- tensorflow lib: face-landmarks-detection: https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection
- workers api: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
- module workers: https://web.dev/module-workers/
- verificar compatibilidade: caniuse.com
- outro exemplo fazendo blink detection: https://selvamsubbiah.com/mediapipe-iris-detection-in-tensorflow-js/
- identificando codigo morse com eye detection: https://medium.com/the-web-tub/recognising-eye-blinking-with-tensorflow-js-3c02b738850d
- layout usado: https://codepen.io/Gunnarhawk/pen/vYJEwoM
- Explicação do porque webgl, cpu, webassembly: https://youtu.be/3ive-w7oUis?t=333

## Aula02 
- Arquivo Gestures para copiar: https://github.com/andypotato/rock-paper-scissors/blob/54add341dbe83287c8ede69fbb006149a8145dd9/src/js/Gestures.js
- Imports do arquivo handGestureFactory:
```js
    import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js"
    import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"
    import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"
    import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"
    import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js"
```
- Problema que encontrei na hora de usar webworker no hands.js: https://github.com/tensorflow/tfjs/issues/7380
- PR aberto no fingerpose: https://github.com/andypotato/fingerpose/pull/25
- Meu fingerpose: https://github.com/ErickWendel/fingerpose
- Jokenpo: https://github.com/andypotato/rock-paper-scissors
- Diagrama do TensorFlow HandPoseDetection: https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection#keypoint-diagram

## Aula03
- Projeto Solar Hands: https://github.com/liady/solar-hands
- Indices dos dedos da API do tensorflow: https://github.com/tensorflow/tfjs-models/tree/a345f0c58522af25d80153ec27c6e999e45fdd42/hand-pose-detection#keypoint-diagram
- elementFromPoint API: https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint

