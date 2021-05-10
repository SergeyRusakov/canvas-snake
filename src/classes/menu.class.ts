import { MenuButton } from './menu-button.class';
import { Component } from '../interfaces/component.interface';
import '../styles/menu.css';

export class Menu implements Component {

    constructor(
        private onNewGameClick: () => void,
    ) {
    }

    public render(): HTMLElement {
        const menu = document.createElement('div');
        menu.classList.add('menu');
        const newGame = new MenuButton('New game').render();
        newGame.addEventListener('click', () => this.onNewGameClick());
        const settings = new MenuButton('Settings').render();
        menu.append(newGame, settings);
        return menu;
    }

}