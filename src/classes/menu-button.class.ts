import { Component } from '../interfaces/component.interface';

export class MenuButton implements Component {

    constructor(
        private title: string,
        private onClick?: () => void
    ) {
    }

    render(): HTMLElement {
        const element = document.createElement('button');
        element.textContent = this.title;
        element.classList.add('menu__button');
        return element;
    }
}
