import {http} from './../../helpers/http';
import {API_URL} from '@env';

export const addItemsToCart = item => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const addItems = (amount, item) => ({
  type: 'CART_ADD_ITEMS',
  payload: {amount, item},
});
