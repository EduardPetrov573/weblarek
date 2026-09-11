import './scss/styles.scss';
import { Api } from './components/base/Api';
import { LarekApi } from './components/Communication/LarekApi';
import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

// Проверка модели каталога товаров (CatalogModel)
const catalogModel = new CatalogModel();

catalogModel.setProducts(apiProducts.items);
console.log('Каталог: массив товаров после setProducts', catalogModel.getProducts());

const firstProduct = apiProducts.items[0];
console.log('Каталог: товар по существующему id', catalogModel.getProduct(firstProduct.id));
console.log('Каталог: товар по несуществующему id', catalogModel.getProduct('unknown-id'));

console.log('Каталог: товар для превью до setPreview', catalogModel.getPreview());
catalogModel.setPreview(firstProduct);
console.log('Каталог: товар для превью после setPreview', catalogModel.getPreview());

// Проверка модели корзины (BasketModel)
const basketModel = new BasketModel();

console.log('Корзина: содержимое пустой корзины', basketModel.getItems());
console.log('Корзина: количество товаров в пустой корзине', basketModel.getCount());
console.log('Корзина: сумма пустой корзины', basketModel.getTotal());

basketModel.add(apiProducts.items[0]);
basketModel.add(apiProducts.items[2]); // товар с price: null
console.log('Корзина: содержимое после добавления двух товаров', basketModel.getItems());
console.log('Корзина: количество товаров', basketModel.getCount());
console.log('Корзина: сумма товаров (один товар без цены)', basketModel.getTotal());
console.log('Корзина: есть ли добавленный товар', basketModel.hasProduct(apiProducts.items[0].id));
console.log('Корзина: есть ли не добавленный товар', basketModel.hasProduct(apiProducts.items[1].id));

basketModel.remove(apiProducts.items[0]);
console.log('Корзина: содержимое после удаления одного товара', basketModel.getItems());

basketModel.clear();
console.log('Корзина: содержимое после очистки', basketModel.getItems());

// Проверка модели покупателя (BuyerModel)
const buyerModel = new BuyerModel();

console.log('Покупатель: данные до заполнения', buyerModel.getData());
console.log('Покупатель: ошибки валидации до заполнения', buyerModel.validate());

buyerModel.setData({ payment: 'card', address: '143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44' });
console.log('Покупатель: данные после заполнения оплаты и адреса', buyerModel.getData());
console.log('Покупатель: ошибки валидации после частичного заполнения', buyerModel.validate());

buyerModel.setData({ email: 'test@test.ru', phone: '+79995554400' });
console.log('Покупатель: данные после заполнения email и телефона', buyerModel.getData());
console.log('Покупатель: ошибки валидации после полного заполнения', buyerModel.validate());

buyerModel.clear();
console.log('Покупатель: данные после очистки', buyerModel.getData());
console.log('Покупатель: ошибки валидации после очистки', buyerModel.validate());

// Проверка слоя коммуникации с сервером (LarekApi)
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi.getProducts()
    .then((response) => {
        catalogModel.setProducts(response.items);
        console.log('Каталог: товары, полученные с сервера и сохранённые в модели', catalogModel.getProducts());
    })
    .catch((error) => {
        console.error('Ошибка при получении списка товаров с сервера', error);
    });
