import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TCardBase } from '../../types';
import { ensureElement, formatPrice } from '../../utils/utils';

export abstract class Card<T extends TCardBase> extends Component<T> {
    protected id = '';
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = formatPrice(value);
    }
}
