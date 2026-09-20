import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IModalRender } from '../../types';
import { AppEvent, CssClass } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalRender> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit(AppEvent.ModalClose);
        });

        container.addEventListener('click', (event) => {
            if (event.target === container) {
                this.events.emit(AppEvent.ModalClose);
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add(CssClass.modalActive);
    }

    close(): void {
        this.container.classList.remove(CssClass.modalActive);
    }
}
