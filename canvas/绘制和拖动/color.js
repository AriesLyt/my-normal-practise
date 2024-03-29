const getInputColor = () => {
    const inputDom = document.querySelector('#color-input')

    return inputDom.value || '#000'
}