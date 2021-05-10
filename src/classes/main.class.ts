import { Component } from '../interfaces/component.interface';
import { Menu } from './menu.class';
import '../styles/main.css';
import { Game } from './game.class';

export class Main implements Component {

    private element: HTMLElement;
    private menu: HTMLElement;
    private canvas: HTMLCanvasElement;
    private game: Game;
    private gameOverText: HTMLElement;

    public render(): HTMLElement {
        this.element = document.createElement('div');
        this.renderMenu();
        return this.element;
    }

    private renderMenu(): void {
        this.menu = new Menu(() => this.handleNewGameClick()).render();
        this.element.classList.add('main');
        this.element.appendChild(this.menu);
    }

    public handleNewGameClick(): void {
        this.startGame();
    }

    private startGame(): void {
        if (Array.from(this.element.children).includes(this.gameOverText)) {
            this.element.removeChild(this.gameOverText);
        }
        if (Array.from(this.element.children).includes(this.menu)) {
            this.element.removeChild(this.menu);
        }
        this.canvas = document.createElement('canvas');
        this.canvas.width = 900;
        this.canvas.height = 500;
        this.canvas.id = 'canvas';
        this.canvas.style.background = 'rgb(196, 203, 177)';
        this.canvas.style.border = '3px solid black';
        this.element.appendChild(this.canvas);
        this.game = new Game('canvas', () => this.onGameOver());
        this.game.start();
    }

    private onGameOver(): void {
        this.game.pauseGame();
        this.gameOverText = document.createElement('div');
        this.gameOverText.classList.add('main__game-over');
        const gameOverHeader = document.createElement('h2');
        gameOverHeader.textContent = 'GAME OVER';
        this.gameOverText.appendChild(gameOverHeader);
        const score = document.createElement('p');
        score.textContent = `Score: ${this.game.score}`;
        this.gameOverText.appendChild(score);
        this.gameOverText.addEventListener('click', () => {
            this.startGame();
            this.element.removeChild(this.canvas);
        });
        this.element.appendChild(this.gameOverText);
    
    }

}