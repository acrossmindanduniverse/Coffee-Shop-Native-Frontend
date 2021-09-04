import {http} from '../../helpers/http';
import {API_URL} from '@env';

export const addItemsToCart = item => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const addItems = (amount, item, total) => ({
  type: 'CART_ADD_ITEMS',
  payload: {amount, item, total},
});

export const deleteFromCart = item => dispatch => {
  dispatch({
    type: 'DELETE_FROM_CART',
    payload: item,
  });
};

export const finalTransaction = (token, transaction) => async dispatch => {
  try {
    const {data} = await http(token).post(`${API_URL}/private/transaction`, {
      item_id: transaction.item_id,
      total: transaction.total,
      tax: transaction.tax,
      item_amount: transaction.item_amount,
      variant: transaction.variant,
      payment_method: transaction.payment_method,
    });
    dispatch({
      type: 'POST_TRANSACTION',
      paylaod: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_FAILED',
      err: err.response.data.data,
    });
  }
};

export const deleteTransactionHistory = (token, id) => async dispatch => {
  try {
    const {data} = await http(token).delete(`${API_URL}/private/${id}`);
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const defaultItems = () => dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'SET_DEFAULT',
    });
  }, 1000);
};
