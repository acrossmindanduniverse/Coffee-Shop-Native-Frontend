import {http} from '../../helpers/http';
import {API_URL} from '@env';

export const getItemsCategory = key => async dispatch => {
  try {
    const {data} = await http().get(`${API_URL}/category`);
    dispatch({
      type: 'GET_CATEGORY',
      payload: {
        items: data.data,
        pageInfo: data.pageInfo,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemsByCategory = key => async dispatch => {
  try {
    const {data} = await http().get(`${API_URL}/category?search=${key}`);
    dispatch({
      type: 'GET_ITEM_CATEGORY',
      payload: {
        items: data.data,
        pageInfo: data.pageInfo,
      },
    });
  } catch (err) {
    dispatch({
      type: 'ITEM_NOT_FOUND',
      err: err.response.data.data,
    });
  }
};

export const getAllItems = () => async dispatch => {
  try {
    const {data} = await http().get(`${API_URL}/items`);
    dispatch({
      type: 'GET_ALL_ITEMS',
      payload: {
        items: data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchItems = key => async dispatch => {
  try {
    const {data} = await http().get(`${API_URL}/items?search=${key}`);
    dispatch({
      type: 'SEARCH_ITEMS',
      payload: {
        items: data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemsAndVariants = id => async dispatch => {
  try {
    const {data} = await http().get(`${API_URL}/variant/${id}`);
    dispatch({
      type: 'GET_ITEMS_AND_VARIANTS',
      payload: {
        items: data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailItemVariant = (id, variant) => async dispatch => {
  try {
    const {data} = await http().get(
      `${API_URL}/variant/detail/${id}?search=${variant}`,
    );
    dispatch({
      type: 'VARIANT_DETAIL',
      payload: {
        items: data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};