const initialState = {
  cartItem: [],
  deleted: [],
  transaction: [],
  items: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return {
        ...state,
        cartItem: [...state.cartItem, ...[action.payload]],
      };
    }
    case 'CART_ADD_ITEMS': {
      return {
        ...state,
        items: [...state.items, ...[action.payload]],
      };
    }
    case 'POST_TRANSACTION': {
      return {
        ...state,
        transaction: action.payload,
      };
    }
    case 'DELETE_TRANSACTION': {
      return {
        ...state,
        deleted: action.payload,
      };
    }
    case 'SET_DEFAULT': {
      return {
        ...state,
        cartItem: [],
        transaction: [],
        items: [],
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default cart;
