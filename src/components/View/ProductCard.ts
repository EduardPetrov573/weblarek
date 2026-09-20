import { Card } from './Card';
import { IEvents } from '../base/Events';
import { TCatalogCard } from '../../types';
import { CDN_URL, CssClass, categoryMap } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export abstract class ProductCard<T extends TCatalogCard> extends Card<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    protected constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `${CssClass.cardCategory} ${categoryMap[value as keyof typeof categoryMap] ?? ''}`;
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}${value}`);
    }
}
