import { Snake } from './snake.class';
import { Direction } from '../enums/direction.enum';
import { SnakeBlock } from '../types/snake-block.type';

export class Game {

    public isGameOver: boolean;
    public score: number;
    private interval: number;
    private snake: Snake;
    private readonly canvas: HTMLCanvasElement;
    private readonly speed: number;
    private direction: Direction;
    private readonly blockSize: number;
    private readonly gridWidth: number;
    private readonly gridHeight: number;
    private readonly ctx: CanvasRenderingContext2D;
    private registeredDirections: Direction[];
    private meal: SnakeBlock;

    constructor(
        elementId: string,
        private onGameOver?: () => void,
        private onScoreChange?: (score: number) => void,
    ) {
        this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.speed = 100;
        this.direction = Direction.RIGHT;
        this.registeredDirections = [];
        this.blockSize = 50;
        this.gridWidth = Math.floor(this.canvas.width / this.blockSize);
        this.gridHeight = Math.floor(this.canvas.height / this.blockSize);
        this.score = 0;
    }

    public start(): void {
        this.snake = this.initSnake();
        this.listenControls();
        this.generateMeal();
        this.drawMeal();
        this.interval = window.setInterval(() => {
            if (this.registeredDirections.length) {
                this.direction = this.registeredDirections.pop();
            }
            this.drawGrid();
            this.drawMeal();
            if (
                this.snake.head.positionY === this.meal.positionY &&
                this.snake.head.positionX === this.meal.positionX
            ) {
                this.snake.increase(this.meal);
                this.score++;
                this.generateMeal();
            } else {
                this.snake.move(this.direction);
            }
        }, this.speed);
    }

    private initSnake(): Snake {
        return new Snake({
            length: 2,
            blockSize: this.blockSize,
            ctx: this.ctx,
            gridWidth: this.gridWidth,
            afterBump: () => this.gameOver(),
            gridHeight: this.gridHeight,
            canvas: this.canvas,
        });
    }

    private listenControls(): void {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'ArrowDown':
                    if (this.direction !== Direction.UP) {
                        this.registeredDirections.push(Direction.DOWN);
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== Direction.RIGHT) {
                        this.registeredDirections.push(Direction.LEFT);
                    }
                    break;
                case 'ArrowUp':
                    if (this.direction !== Direction.DOWN) {
                        this.registeredDirections.push(Direction.UP);
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== Direction.LEFT) {
                        this.registeredDirections.push(Direction.RIGHT);
                    }
                    break;
            }
        });
    }

    private gameOver(): void {
        this.onGameOver();
        clearInterval(this.interval);
    }

    private drawGrid(): void {
        this.ctx.strokeStyle = 'rgb(182, 186, 163)';
        this.ctx.fillStyle = 'rgb(182, 186, 163)';
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                this.ctx.strokeRect(
                    i * this.blockSize,
                    j * this.blockSize,
                    this.blockSize,
                    this.blockSize
                );
                this.ctx.fillRect(
                    i * this.blockSize + 10,
                    j * this.blockSize + 10,
                    this.blockSize - 20,
                    this.blockSize - 20
                );
            }
        }
        this.ctx.strokeStyle = 'rgb(0, 0, 0)';
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.lineWidth = 2;
    }

    private generateMeal(): void {
        while (true) {
            const positionX = Math.floor(Math.random() * this.gridWidth) * this.blockSize;
            const positionY = Math.floor(Math.random() * this.gridHeight) * this.blockSize;
            this.meal = {positionX, positionY};
            if (!this.snake.blocks.find(block =>
                block.positionX === positionX &&
                block.positionY === positionY)) {
                break;
            }
        }
    }

    private drawMeal(): void {
        this.ctx.strokeStyle = 'rgb(99 103 86)';
        this.ctx.fillStyle = 'rgb(99 103 86)';
        this.ctx.strokeRect(
            this.meal.positionX,
            this.meal.positionY,
            this.blockSize,
            this.blockSize
        );
        this.ctx.fillRect(
            this.meal.positionX + 10,
            this.meal.positionY + 10,
            30,
            30
        );
    }

    public pauseGame(): void {
        clearInterval(this.interval);
    }

}
