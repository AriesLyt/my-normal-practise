/**
 * @type { HTMLElement }
 */
const cvs = document.querySelector('#cvs')
/**
 * @type { CanvasRenderingContext2D }
 */
const ctx = cvs.getContext('2d')

const w = 900 * devicePixelRatio
const h = 600 * devicePixelRatio
cvs.width = w
cvs.height = h
cvs.style.width = `${w}px`
cvs.style.height = `${h}px`
// ctx.scale(devicePixelRatio, devicePixelRatio)

// const rect = new CreateRect({ sx: 10, sy: 10, fillColor: 'skyblue' }).updateEndPoint({
//     ex: 100, ey: 100
// }).render(ctx)

const shapes = []

const findDownShape = (x, y) => {
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]
        if (shape.mouseIn(x, y)) {
            return shape
        }
    }
}

const moveShape = (dEvent, shape) => {
    let { offsetX, offsetY } = dEvent

    cvs.onmousemove = (mEvent) => {
        const { offsetX: ex, offsetY: ey } = mEvent
        const diffX = ex - offsetX
        const diffY = ey - offsetY
        shape.move(diffX, diffY)
        offsetX = ex
        offsetY = ey
    }
}

const addShape = (dEvent) => {
    const sx = dEvent.offsetX
    const sy = dEvent.offsetY

    const fillColor = getInputColor()

    const rectangle = new CreateRect({ sx, sy, fillColor })

    shapes.push(
        rectangle
    )

    cvs.onmousemove = (mEvent) => {
        const ex = mEvent.offsetX
        const ey = mEvent.offsetY
        rectangle.updateEndPoint({ ex, ey })
    }
}

cvs.onmousedown = (dEvent) => {
    const sx = dEvent.offsetX
    const sy = dEvent.offsetY

    const shape = findDownShape(sx, sy)

    if (shape) {
        moveShape(dEvent, shape)
    } else {
        addShape(dEvent)
    }

    cvs.onmouseup = () => {
        cvs.onmousemove = null
        cvs.onmouseup = null
    }
}

const render = () => {
    requestAnimationFrame(render)
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (let shape of shapes) {
        shape.render(ctx)
    }
}

render()
// document.onkeydown = (event) => {
//     if (event.code === 'Enter') {
//         render()
//     }
// }