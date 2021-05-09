export class Snake {

    constructor(ctx, blockSize, afterBump, canvas, gridWidth, gridHeight) {
        this.ctx = ctx;
        this.blockSize = blockSize;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
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
        this.afterBump = afterBump;
        this.canvas = canvas;
    }

    get head() {
        return this.blocks[this.blocks.length - 1];
    }

    increase(meal) {
        this.blocks.push(
            {
                positionX: meal.positionX,
                positionY: meal.positionY,
            }
        )
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

        switch (direction) {
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

        if (positionX >= this.canvas.width) {
            this.blocks.push({
                positionX: 0,
                positionY
            });
        } else if (positionY >= this.canvas.height) {
            this.blocks.push({
                positionX,
                positionY: 0
            });
        } else if (positionX < 0) {
            console.log(this.gridWidth);
            console.log(this.blockSize);
            this.blocks.push({
                positionX: this.gridWidth * this.blockSize - this.blockSize,
                positionY,
            });
        } else if (positionY < 0) {
            this.blocks.push({
                positionX,
                positionY: this.gridHeight * this.blockSize - this.blockSize,
            });
        } else {
            this.blocks.push({
                positionX,
                positionY,
            });
        }

        this.blocks.shift();

        this.draw();

        for (let i = 0; i < this.blocks.length - 1; i++) {
            const block = this.blocks[i];
            if (
                block.positionX === this.head.positionX &&
                block.positionY === this.head.positionY
            ) {
                this.afterBump();
            }
        }
    }

}
