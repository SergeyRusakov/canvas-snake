import { Game } from './classes/game.class'

const scoreCount = document.getElementById('score');

const game = new Game('canvas', () => {}, (score) => {
    scoreCount.textContent = score.toString();
});
game.start();
