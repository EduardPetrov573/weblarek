import { IEvents } from '../base/Events';
import { IProduct } from '../../types';
import { AppEvent } from '../../utils/constants';

export class CatalogModel {
    protected products: IProduct[] = [];
    protected preview: IProduct | null = null;

    constructor(protected events: IEvents) {}

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit(AppEvent.CatalogChanged);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    setPreview(product: IProduct): void {
        this.preview = product;
        this.events.emit(AppEvent.PreviewChanged);
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}
