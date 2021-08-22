const initialState = {
  data: [],
  itemsToDelete: [],
  dataByCategory: [],
  itemsAndVariants: [],
  allItems: [],
  deleteFromCart: [],
  searchItemsData: [],
  changeSearchState: 0,
  variantDetail: [],
  allTransactions: [],
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
    case 'CHANGE_SEARCH_STATE': {
      return {
        ...state,
        changeSearchState: action.payload,
      };
    }
    case 'SEARCH_ITEMS': {
      return {
        ...state,
        searchItemsData: action.payload.items,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'SEARCH_ITEMS_NEXT': {
      return {
        ...state,
        searchItemsData: [...state.searchItemsData, ...action.payload.items],
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'GET_ITEM_CATEGORY_NEXT': {
      return {
        ...state,
        dataByCategory: [...state.dataByCategory, ...action.payload.items],
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'ITEM_NOT_FOUND': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'ITEM_DEFAULT': {
      return {
        ...state,
        pageInfo: [],
        searchItemsData: [],
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
    case 'GET_ALL_TRANSACTIONS': {
      return {
        ...state,
        allTransactions: action.payload.items,
      };
    }
    case 'GET_ALL_TRANSACTIONS_FAILED': {
      return {
        ...state,
        err: action.payload,
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
