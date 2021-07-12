const initialState = {
  data: {},
  info: null,
  errMsg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SIGNUP': {
      return {
        ...state,
      };
    }
    case 'AUTH_SIGNIN': {
      return {
        ...state,
        data: action.payload.data,
        info: action.payload,
      };
    }
    case 'AUTH_SIGNIN_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
