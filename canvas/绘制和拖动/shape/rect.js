class CreateRect {
    constructor({ sx, sy, fillColor, borderColor = 'white' }) {
        this.sx = sx
        this.sy = sy
        this.ey = sx
        this.ey = sy
        this.fillColor = fillColor
        this.borderColor = borderColor

        this.oldPointMove
        return this
    }

    get pointCoordinate() {
        return {
            sx: Math.min(this.sx, this.ex) * devicePixelRatio,
            ex: Math.max(this.sx, this.ex) * devicePixelRatio,
            sy: Math.min(this.sy, this.ey) * devicePixelRatio,
            ey: Math.max(this.sy, this.ey) * devicePixelRatio
        }
    }

    updateEndPoint({ ex, ey }) {
        this.ex = ex
        this.ey = ey
        return this
    }

    mouseIn(x, y) {
        const { sx, sy, ex, ey } = this.pointCoordinate
        return x >= sx && x <= ex && y >= sy && y <= ey
    }

    move(mx, my) {
        this.sx += mx
        this.ex += mx
        this.sy += my
        this.ey += my
    }

    /**
     * 渲染border方法, 传递 canvas 上下文
     * @param {CanvasRenderingContext2D} ctx 
     */
    renderBorder(ctx) {
        ctx.lineCap = 'square'
        ctx.lineWidth = 4 * devicePixelRatio
        ctx.strokeStyle = this.borderColor
        ctx.stroke()
    }

    /**
     * 渲染方法, 传递 canvas 上下文
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        const { sx, sy, ex, ey } = this.pointCoordinate
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(ex, sy)
        ctx.lineTo(ex, ey)
        ctx.lineTo(sx, ey)
        ctx.lineTo(sx, sy)
        ctx.fillStyle = this.fillColor
        ctx.fill()

        this.renderBorder(ctx)
    }
}