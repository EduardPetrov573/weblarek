/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

/* Константы текстов интерфейса. */
export const PRICE_UNIT = 'синапсов';
export const FREE_PRICE_TEXT = 'Бесценно';
export const SUCCESS_TEXT_PREFIX = 'Списано';
export const ERRORS_SEPARATOR = '. ';

export const ButtonText = {
  buy: 'В корзину',
  remove: 'Удалить из корзины',
  unavailable: 'Недоступно',
} as const;

/* Константы CSS-классов, которые компоненты представления добавляют и убирают динамически. */
export const CssClass = {
  modalActive: 'modal_active',
  paymentActive: 'button_alt-active',
  cardCategory: 'card__category',
} as const;

/* Смещение порядкового номера товара в корзине относительно индекса в массиве (нумерация с единицы). */
export const BASKET_ITEM_NUMBER_OFFSET = 1;

/* Константа имён событий приложения. Используется и в моделях данных (генерация событий),
и в компонентах представления (генерация событий), и в презентере (main.ts, подписка на события) -
единый источник правды исключает дублирование строк-констант и опечатки в них. */
export const AppEvent = {
  CatalogChanged: 'catalog:changed',
  PreviewChanged: 'preview:changed',
  BasketChanged: 'basket:changed',
  BuyerChanged: 'buyer:changed',
  CardSelect: 'card:select',
  CardBuy: 'card:buy',
  BasketRemove: 'basket:remove',
  BasketOpen: 'basket:open',
  OrderOpen: 'order:open',
  OrderChange: 'order:change',
  OrderSubmit: 'order:submit',
  ContactsChange: 'contacts:change',
  ContactsSubmit: 'contacts:submit',
  ModalClose: 'modal:close',
} as const;

