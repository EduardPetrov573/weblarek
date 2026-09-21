import { Component } from '../base/Component';
import { TCardBase } from '../../types';
import { ensureElement, formatPrice } from '../../utils/utils';

export abstract class Card<T extends TCardBase> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement) {
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
