const initialState = {
  cartItem: [],
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
    default:
      return {
        ...state,
      };
  }
};

export default cart;
