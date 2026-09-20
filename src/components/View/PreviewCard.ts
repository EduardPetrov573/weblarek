import { ProductCard } from './ProductCard';
import { IEvents } from '../base/Events';
import { TPreviewCard } from '../../types';
import { AppEvent } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class PreviewCard extends ProductCard<TPreviewCard> {
    protected textElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.textElement = ensureElement<HTMLElement>('.card__text', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);

        this.buttonElement.addEventListener('click', () => {
            this.events.emit(AppEvent.CardBuy, { id: this.id });
        });
    }

    set description(value: string) {
        this.textElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}
