export class Snake {

    constructor(ctx, blockSize) {
        this.ctx = ctx;
        this.blockSize = blockSize;
        this.blocks = [
            {
                positionX: 0,
                positionY: 0,
            },
            {
                positionX: 0,
                positionY: blockSize,
            },
            {
                positionX: 0,
                positionY: blockSize * 2,
            }
        ];
    }

    get head() {
        return this.blocks[this.blocks.length - 1];
    }

    draw() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.blocks.forEach(block => {
            this.ctx.fillRect
            (
                block.positionX,
                block.positionY,
                this.blockSize,
                this.blockSize
            );
        });
    }

    move(direction) {
        let positionX;
        let positionY;

        switch(direction) {
            case 'up':
                positionY = this.head.positionY - this.blockSize;
                positionX = this.head.positionX;
                break;
            case 'right':
                positionY = this.head.positionY;
                positionX = this.head.positionX + this.blockSize;
                break;
            case 'down':
                positionY = this.head.positionY + this.blockSize;
                positionX = this.head.positionX;
                break;
            case 'left':
                positionY = this.head.positionY;
                positionX = this.head.positionX - this.blockSize;
                break;
        }

        this.blocks.push({
            positionX,
            positionY,
        });

        this.blocks.shift();
        this.draw();
    }

}
