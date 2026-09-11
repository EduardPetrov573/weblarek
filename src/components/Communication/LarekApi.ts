import { IApi, IOrderRequest, IOrderResult, IProductsResponse } from '../../types';

const PRODUCTS_ENDPOINT = '/product/';
const ORDER_ENDPOINT = '/order/';

export class LarekApi {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>(PRODUCTS_ENDPOINT);
    }

    createOrder(order: IOrderRequest): Promise<IOrderResult> {
        return this.api.post<IOrderResult>(ORDER_ENDPOINT, order);
    }
}
