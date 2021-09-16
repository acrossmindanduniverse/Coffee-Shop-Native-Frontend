import {http} from '../../helpers/http';
const API_URL = 'https://historycoffee.herokuapp.com';

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

export const getItemsByCategory = (key, page) => async dispatch => {
  try {
    if (!page) {
      const {data} = await http().get(`${API_URL}/category?search=${key}`);
      dispatch({
        type: 'GET_ITEM_CATEGORY',
        payload: {
          items: data.data,
          pageInfo: data.pageInfo,
        },
      });
    } else {
      const {data} = await http().get(
        `${API_URL}/category?search=${key}&page=${page}`,
      );
      dispatch({
        type: 'GET_ITEM_CATEGORY_NEXT',
        payload: {
          items: data.data,
          pageInfo: data.pageInfo,
        },
      });
    }
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

export const searchItems = (key, sortBy, sort, page) => async dispatch => {
  console.log(page, 'test page');
  try {
    if (page === undefined) {
      const {data} = await http().get(
        `${API_URL}/items?search=${key}&sort[${sortBy}]=${sort}`,
      );
      dispatch({
        type: 'SEARCH_ITEMS',
        payload: {
          items: data.data,
          pageInfo: data.pageInfo,
        },
      });
    } else {
      const {data} = await http().get(
        `${API_URL}/items?search=${key}&sort[${sortBy}]=${sort}&page=${page}`,
      );
      dispatch({
        type: 'SEARCH_ITEMS_NEXT',
        payload: {
          items: data.data,
          pageInfo: data.pageInfo,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const changeSearchState = () => dispatch => {
  dispatch({
    type: 'CHANGE_SEARCH_STATE',
  });
};

export const getItemDefault = () => dispatch => {
  dispatch({
    type: 'ITEM_DEFAULT',
  });
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

export const getAllTransactions = (token, id) => async dispatch => {
  try {
    const {data} = await http(token, id).get(
      `${API_URL}/private/user-transactions`,
    );
    dispatch({
      type: 'GET_ALL_TRANSACTIONS',
      payload: {
        items: data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: 'GET_ALL_TRANSACTIONS_FAILED',
      err: err.response.data.data,
    });
  }
};
