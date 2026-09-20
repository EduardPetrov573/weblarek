import { Form } from './Form';
import { IEvents } from '../base/Events';
import { TOrderFormRender, TPayment } from '../../types';
import { AppEvent, CssClass } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class OrderForm extends Form<TOrderFormRender> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events, AppEvent.OrderChange, AppEvent.OrderSubmit);
        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit(this.changeEvent, { field: 'payment', value: 'card' });
        });
        this.cashButton.addEventListener('click', () => {
            this.events.emit(this.changeEvent, { field: 'payment', value: 'cash' });
        });
    }

    set payment(value: TPayment) {
        this.cardButton.classList.toggle(CssClass.paymentActive, value === 'card');
        this.cashButton.classList.toggle(CssClass.paymentActive, value === 'cash');
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}
