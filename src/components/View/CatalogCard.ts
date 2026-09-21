import { ProductCard } from './ProductCard';
import { TCardCallback, TCatalogCard } from '../../types';

export class CatalogCard extends ProductCard<TCatalogCard> {
    constructor(container: HTMLElement, onSelect: TCardCallback) {
        super(container);

        container.addEventListener('click', () => onSelect());
    }
}
