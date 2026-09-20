import { Card } from './Card';
import { IEvents } from '../base/Events';
import { TBasketCard } from '../../types';
import { AppEvent } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class BasketCard extends Card<TBasketCard> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.deleteButton.addEventListener('click', () => {
            this.events.emit(AppEvent.BasketRemove, { id: this.id });
        });
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
