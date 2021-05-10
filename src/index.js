import { Game } from './classes/game.class'
import { Main } from './classes/main.class';
import { Menu } from "./classes/menu.class";
import './reset.css';

const scoreCount = document.getElementById('score');

// const game = new Game('canvas', () => {}, (score) => {
//     scoreCount.textContent = score.toString();
// });
// game.start();

// const menu = new Menu();
const main = new Main();
document.body.append(main.render());
