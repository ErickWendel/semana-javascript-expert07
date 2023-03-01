onmessage = ({ data }) => {
    console.log('worker!', data)
    postMessage({
        'ook': 'ok'
    })
}


// minuto 1:20:00