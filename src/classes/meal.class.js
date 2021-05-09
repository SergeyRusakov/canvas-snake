export class Meal {

    constructor(positionX, positionY, ctx, size) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.ctx = ctx;
        this.size = size;
    }

    draw() {
        this.ctx.fillRect(
            this.positionX,
            this.positionY,
            this.size,
            this.size
        )
    }

}