import { Snake } from './snake.class';
import { Direction } from '../enums/direction.enum';
import { SnakeBlock } from '../types/snake-block.type';

export class Game {

    private interval: number;
    private snake: Snake;
    private canvas: HTMLCanvasElement;
    private readonly speed: number;
    private direction: Direction;
    private readonly blockSize: number;
    private readonly gridWidth: number;
    private readonly gridHeight: number;
    private readonly ctx: CanvasRenderingContext2D;
    private registeredDirections: Direction[];
    private meal: SnakeBlock;

    constructor(elementId: string, private onGameOver?: () => void) {
        this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.speed = 100;
        this.direction = Direction.RIGHT;
        this.registeredDirections = [];
        this.blockSize = 50;
        this.gridWidth = Math.floor(this.canvas.width / this.blockSize);
        this.gridHeight = Math.floor(this.canvas.height / this.blockSize);
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
            if (
                this.snake.head.positionY === this.meal.positionY &&
                this.snake.head.positionX === this.meal.positionX
            ) {
                this.snake.increase(this.meal);
                this.generateMeal();
            } else {
                this.snake.move(this.direction);
            }
            this.drawGrid();
            this.drawMeal();
        }, this.speed);
    }

    private initSnake(): Snake {
        return new Snake({
            length: 2,
            blockSize: this.blockSize,
            ctx: this.ctx,
            gridWidth: this.gridWidth,
            afterBump: this.gameOver,
            gridHeight: this.gridHeight,
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
        console.log('sdfasdfasdf')
        // this.onGameOver();
    }

    private drawGrid(): void {
        for (let i = 0; i < this.gridWidth; i++) {
            this.ctx.moveTo(i * this.blockSize, 0);
            this.ctx.lineTo(i * this.blockSize, this.gridHeight * this.blockSize);
        }

        for (let i = 0; i < this.gridHeight; i++) {
            this.ctx.moveTo(0, i * this.blockSize);
            this.ctx.lineTo(this.gridWidth * this.blockSize, i * this.blockSize);
        }

        this.ctx.stroke();
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
        this.ctx.fillRect(
            this.meal.positionX,
            this.meal.positionY,
            this.blockSize,
            this.blockSize
        );
    }



}