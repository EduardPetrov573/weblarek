import { Card } from './Card';
import { TBasketCard, TCardCallback } from '../../types';
import { ensureElement } from '../../utils/utils';

export class BasketCard extends Card<TBasketCard> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, onRemove: TCardCallback) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.deleteButton.addEventListener('click', () => onRemove());
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
