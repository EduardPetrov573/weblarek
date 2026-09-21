import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TSuccessRender } from '../../types';
import { AppEvent, SUCCESS_TEXT_PREFIX } from '../../utils/constants';
import { ensureElement, formatPrice } from '../../utils/utils';

export class Success extends Component<TSuccessRender> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit(AppEvent.SuccessClose);
        });
    }

    set total(value: number) {
        this.descriptionElement.textContent = `${SUCCESS_TEXT_PREFIX} ${formatPrice(value)}`;
    }
}
