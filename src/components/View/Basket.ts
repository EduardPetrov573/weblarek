import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBasketRender } from '../../types';
import { AppEvent } from '../../utils/constants';
import { ensureElement, formatPrice } from '../../utils/utils';

export class Basket extends Component<IBasketRender> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.listElement = ensureElement<HTMLElement>('.basket__list', container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', container);
        this.button = ensureElement<HTMLButtonElement>('.basket__button', container);

        this.button.addEventListener('click', () => {
            this.events.emit(AppEvent.OrderOpen);
        });
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.priceElement.textContent = formatPrice(value);
    }

    set valid(value: boolean) {
        this.button.disabled = !value;
    }
}
