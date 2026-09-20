import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IFormState } from '../../types';
import { ensureElement } from '../../utils/utils';

export abstract class Form<T extends IFormState> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    protected constructor(
        container: HTMLFormElement,
        protected events: IEvents,
        protected changeEvent: string,
        protected submitEvent: string
    ) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

        container.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            if (!target.name) return;
            this.events.emit(this.changeEvent, { field: target.name, value: target.value });
        });

        container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit(this.submitEvent);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}
