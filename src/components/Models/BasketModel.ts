import { IEvents } from '../base/Events';
import { IProduct } from '../../types';
import { AppEvent } from '../../utils/constants';

export class BasketModel {
    protected items: IProduct[] = [];

    constructor(protected events: IEvents) {}

    getItems(): IProduct[] {
        return this.items;
    }

    add(product: IProduct): void {
        this.items.push(product);
        this.events.emit(AppEvent.BasketChanged);
    }

    remove(product: IProduct): void {
        this.items = this.items.filter((item) => item.id !== product.id);
        this.events.emit(AppEvent.BasketChanged);
    }

    clear(): void {
        this.items = [];
        this.events.emit(AppEvent.BasketChanged);
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
    }

    getCount(): number {
        return this.items.length;
    }

    hasProduct(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}
