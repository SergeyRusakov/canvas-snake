import { Direction } from '../enums/direction.enum';
import { SnakeProps } from '../types/snake-props.type';
import { SnakeBlock } from '../types/snake-block.type';

export class Snake {

    public blocks: SnakeBlock[];

    constructor(private props: SnakeProps) {
        this.initDefaultBlocks();
    }

    public get head(): SnakeBlock {
        return this.blocks[this.blocks.length - 1];
    }

    private initDefaultBlocks(): void {
        const {length, blockSize} = this.props;
        this.blocks = [];
        for (let i = 0; i < length; i++) {
            this.blocks.push({
                positionY: 0,
                positionX: i * blockSize,
            });
        }
    }

    public move(direction: Direction): void {
        let {positionX, positionY} = this.head;
        const {blockSize, gridHeight, gridWidth} = this.props;
        switch (direction) {
            case Direction.UP:
                positionY =
                    positionY - blockSize >= 0 ?
                        positionY - blockSize :
                        gridHeight * blockSize - blockSize
                break;
            case Direction.RIGHT:
                positionX =
                    positionX + blockSize < gridWidth * blockSize ?
                        positionX + blockSize :
                        0;
                break;
            case Direction.DOWN:
                positionY =
                    positionY + blockSize < gridHeight * blockSize ?
                        positionY + blockSize :
                        0;
                break;
            case Direction.LEFT:
                positionX =
                    positionX - blockSize >= 0 ?
                        positionX - blockSize :
                        gridWidth * blockSize - blockSize;
                break;
        }
        this.blocks.shift();
        this.increase({positionX, positionY});
        if (this.isBumped()) {
            this.props.afterBump();
        }
    }

    private draw(): void {
        const {ctx, blockSize, gridWidth, gridHeight} = this.props;
        this.blocks.forEach(block => {
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.strokeRect(
                block.positionX,
                block.positionY,
                blockSize,
                blockSize
            );
            ctx.fillRect(
                block.positionX + 10,
                block.positionY + 10,
                30,
                30
            );
        });
    }

    public increase(block: SnakeBlock): void {
        this.blocks.push(block);
        this.draw();
    }

    private isBumped(): boolean {
        return !!this.blocks.find((block, index) => {
            if (index !== this.blocks.length - 1) {
                return block.positionX === this.head.positionX &&
                    block.positionY === this.head.positionY;
            }
        });
    }

}