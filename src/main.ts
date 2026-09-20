import './scss/styles.scss';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { LarekApi } from './components/Communication/LarekApi';
import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Modal } from './components/View/Modal';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { CatalogCard } from './components/View/CatalogCard';
import { PreviewCard } from './components/View/PreviewCard';
import { BasketCard } from './components/View/BasketCard';
import { Basket } from './components/View/Basket';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Success } from './components/View/Success';
import { API_URL, AppEvent, BASKET_ITEM_NUMBER_OFFSET, ButtonText } from './utils/constants';
import { cloneTemplate, ensureElement, joinErrors } from './utils/utils';
import { IFormFieldChangeEvent, IOrderRequest, IProduct, IProductIdEvent, TPayment } from './types';

const events = new EventEmitter();
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const buyerModel = new BuyerModel(events);

const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const previewContainer = cloneTemplate<HTMLElement>('#card-preview');
const previewCard = new PreviewCard(previewContainer, events);

const basketContainer = cloneTemplate<HTMLElement>('#basket');
const basket = new Basket(basketContainer, events);

const orderContainer = cloneTemplate<HTMLFormElement>('#order');
const orderForm = new OrderForm(orderContainer, events);

const contactsContainer = cloneTemplate<HTMLFormElement>('#contacts');
const contactsForm = new ContactsForm(contactsContainer, events);

const successContainer = cloneTemplate<HTMLElement>('#success');
const success = new Success(successContainer, events);

// Синхронизация представлений с моделями данных

function getPreviewButtonText(product: IProduct): string {
    if (product.price === null) return ButtonText.unavailable;
    return basketModel.hasProduct(product.id) ? ButtonText.remove : ButtonText.buy;
}

function renderBasket(): void {
    header.render({ counter: basketModel.getCount() });

    const items = basketModel.getItems().map((product, index) => {
        const cardContainer = cloneTemplate<HTMLElement>('#card-basket');
        const card = new BasketCard(cardContainer, events);
        return card.render({ ...product, index: index + BASKET_ITEM_NUMBER_OFFSET });
    });

    basket.render({
        items,
        total: basketModel.getTotal(),
        valid: basketModel.getCount() > 0,
    });
}

function renderBuyerForms(): void {
    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();

    orderForm.render({
        payment: buyer.payment,
        address: buyer.address,
        valid: !errors.payment && !errors.address,
        errors: joinErrors([errors.payment, errors.address]),
    });

    contactsForm.render({
        email: buyer.email,
        phone: buyer.phone,
        valid: !errors.email && !errors.phone,
        errors: joinErrors([errors.email, errors.phone]),
    });
}

// События моделей данных - перерисовка представлений

events.on(AppEvent.CatalogChanged, () => {
    const cards = catalogModel.getProducts().map((product) => {
        const cardContainer = cloneTemplate<HTMLElement>('#card-catalog');
        const card = new CatalogCard(cardContainer, events);
        return card.render(product);
    });
    gallery.render({ items: cards });
});

events.on(AppEvent.PreviewChanged, () => {
    const product = catalogModel.getPreview();
    if (!product) return;

    previewCard.render({
        ...product,
        buttonText: getPreviewButtonText(product),
        buttonDisabled: product.price === null,
    });

    modal.render({ content: previewContainer });
    modal.open();
});

events.on(AppEvent.BasketChanged, renderBasket);
events.on(AppEvent.BuyerChanged, renderBuyerForms);

// События представлений - действия над моделями данных

events.on(AppEvent.CardSelect, (data: IProductIdEvent) => {
    const product = catalogModel.getProduct(data.id);
    if (product) {
        catalogModel.setPreview(product);
    }
});

events.on(AppEvent.CardBuy, (data: IProductIdEvent) => {
    const product = catalogModel.getProduct(data.id);
    if (!product) return;

    if (basketModel.hasProduct(product.id)) {
        basketModel.remove(product);
    } else {
        basketModel.add(product);
    }

    modal.close();
});

events.on(AppEvent.BasketRemove, (data: IProductIdEvent) => {
    const product = basketModel.getItems().find((item) => item.id === data.id);
    if (product) {
        basketModel.remove(product);
    }
});

events.on(AppEvent.BasketOpen, () => {
    modal.render({ content: basketContainer });
    modal.open();
});

events.on(AppEvent.OrderOpen, () => {
    orderForm.render({ errors: '' });
    modal.render({ content: orderContainer });
    modal.open();
});

events.on(AppEvent.OrderChange, (data: IFormFieldChangeEvent) => {
    if (data.field === 'payment') {
        buyerModel.setData({ payment: data.value as TPayment });
    } else if (data.field === 'address') {
        buyerModel.setData({ address: data.value });
    }
});

events.on(AppEvent.OrderSubmit, () => {
    contactsForm.render({ errors: '' });
    modal.render({ content: contactsContainer });
});

events.on(AppEvent.ContactsChange, (data: IFormFieldChangeEvent) => {
    if (data.field === 'email') {
        buyerModel.setData({ email: data.value });
    } else if (data.field === 'phone') {
        buyerModel.setData({ phone: data.value });
    }
});

events.on(AppEvent.ContactsSubmit, () => {
    const buyer = buyerModel.getData();
    const order: IOrderRequest = {
        ...buyer,
        total: basketModel.getTotal(),
        items: basketModel.getItems().map((item) => item.id),
    };

    larekApi.createOrder(order)
        .then((result) => {
            basketModel.clear();
            buyerModel.clear();
            success.render({ total: result.total });
            modal.render({ content: successContainer });
        })
        .catch((error) => {
            console.error('Ошибка при оформлении заказа', error);
        });
});

events.on(AppEvent.ModalClose, () => {
    modal.close();
});

// Начальное состояние и загрузка каталога с сервера

renderBasket();
renderBuyerForms();

larekApi.getProducts()
    .then((response) => {
        catalogModel.setProducts(response.items);
    })
    .catch((error) => {
        console.error('Ошибка при получении списка товаров с сервера', error);
    });
