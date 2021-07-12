const initialState = {
  data: [],
  dataByCategory: [],
  itemsAndVariants: [],
  allItems: [],
  searchItemsData: [],
  variantDetail: [],
  pageInfo: [],
  errMsg: '',
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY': {
      return {
        ...state,
        data: action.payload.items,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'GET_ALL_ITEMS': {
      return {
        ...state,
        allItems: action.payload.items,
      };
    }
    case 'GET_ITEM_CATEGORY': {
      return {
        ...state,
        dataByCategory: action.payload.items,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'SEARCH_ITEMS': {
      return {
        ...state,
        searchItemsData: action.payload.items,
      };
    }
    case 'ITEM_NOT_FOUND': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'GET_ITEMS_AND_VARIANTS': {
      return {
        ...state,
        itemsAndVariants: action.payload.items,
      };
    }
    case 'VARIANT_DETAIL': {
      return {
        ...state,
        variantDetail: action.payload.items,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default items;
