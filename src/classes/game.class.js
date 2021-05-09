import { Snake } from "./snake.class.js";
import { Meal } from "./meal.class";

export class Game {

    blockSize = 50;
    speed = 100;
    direction = 'down';

    constructor(canvasElementId) {
        this.canvas = document.getElementById(canvasElementId);
        this.ctx = this.canvas.getContext('2d');
        this.gridWidth = Math.floor(this.canvas.width / this.blockSize);
        this.gridHeight = Math.floor(this.canvas.height / this.blockSize);
    }

    start() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.drawGrid();
        this.listenControls();
        this.snake = new Snake(
            this.ctx,
            this.blockSize,
            () => this.start(),
            this.canvas,
            this.gridWidth,
            this.gridHeight
        );
        this.addMeal();
        this.interval = setInterval(() => {
            this.snake.move(this.direction);
            this.drawGrid();
            this.meal.draw();
            if (
                this.snake.head.positionY === this.meal.positionY &&
                this.snake.head.positionX === this.meal.positionX
            ) {
                this.snake.increase(this.meal);
                this.addMeal();
            }

        }, this.speed);
    }

    listenControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'ArrowDown':
                    if (this.direction !== 'up') {
                        this.direction = 'down';
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') {
                        this.direction = 'left';
                    }
                    break;
                case 'ArrowUp':
                    if (this.direction !== 'down') {
                        this.direction = 'up';
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') {
                        this.direction = 'right';
                    }
                    break;
            }
        });
    }

    drawGrid() {

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

    addMeal() {
        while (true) {
            const positionX = Math.floor(Math.random() * this.gridWidth) * this.blockSize;
            const positionY = Math.floor(Math.random() * this.gridHeight) * this.blockSize;
            this.meal = new Meal(positionX, positionY, this.ctx, this.blockSize);
            if (!this.snake.blocks.find(block => block.positionX === positionX && block.positionY === positionY)) {
                break;
            }
        }

    }


}