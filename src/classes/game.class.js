import { Snake } from "./snake.class.js";

export class Game {

    blockSize = 50;
    speed = 200;
    direction = 'down';

    constructor(canvasElementId) {
        this.canvas = document.getElementById(canvasElementId);
        this.ctx = this.canvas.getContext('2d');
    }

    start() {
        this.drawGrid();
        this.listenControls();
        const {width, heaight} = this.canvas;
        const snake = new Snake(this.ctx, this.blockSize);
        setInterval(() => {
            snake.move(this.direction);
            this.drawGrid();
        }, this.speed);
    }

    listenControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'ArrowDown':
                    this.direction = 'down';
                    break;
                case 'ArrowLeft':
                    this.direction = 'left';
                    break;
                case 'ArrowUp':
                    this.direction = 'up';
                    break;
                case 'ArrowRight':
                    this.direction = 'right';
                    break;
            }
        });
    }

    drawGrid() {

        const {width, height} = this.canvas;
        
        for (let i = 0; i < width; i += this.blockSize) {
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, height);
        }
    
        for (let i = 0; i < height; i += this.blockSize) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(width, i);
        }
    
        this.ctx.stroke();
    }


}