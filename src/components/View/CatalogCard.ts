import { ProductCard } from './ProductCard';
import { IEvents } from '../base/Events';
import { TCatalogCard } from '../../types';
import { AppEvent } from '../../utils/constants';

export class CatalogCard extends ProductCard<TCatalogCard> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        container.addEventListener('click', () => {
            this.events.emit(AppEvent.CardSelect, { id: this.id });
        });
    }
}
