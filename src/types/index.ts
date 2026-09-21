export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export type TPayment = 'card' | 'cash' | '';

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

// ===== Типы слоя представления (View) =====

export type TCardCallback = () => void;

export type TCardBase = Pick<IProduct, 'title' | 'price'>;

export type TCatalogCard = TCardBase & Pick<IProduct, 'category' | 'image'>;

export type TPreviewCard = TCatalogCard & Pick<IProduct, 'description'> & {
    buttonText: string;
    buttonDisabled: boolean;
};

export type TBasketCard = TCardBase & {
    index: number;
};

export interface IGalleryRender {
    items: HTMLElement[];
}

export interface IHeaderRender {
    counter: number;
}

export interface IBasketRender {
    items: HTMLElement[];
    total: number;
    valid: boolean;
}

export interface IModalRender {
    content: HTMLElement;
}

export interface IFormState {
    valid: boolean;
    errors: string;
}

export type TOrderFormRender = Pick<IBuyer, 'payment' | 'address'> & IFormState;

export type TContactsFormRender = Pick<IBuyer, 'email' | 'phone'> & IFormState;

export type TSuccessRender = Pick<IOrderResult, 'total'>;

// ===== Типы событий =====

export interface IProductIdEvent {
    id: string;
}

export interface IFormFieldChangeEvent {
    field: string;
    value: string;
}
