const initialState = {
  onAuth: false,
  data: {},
  info: null,
  signUpErrMsg: '',
  errMsg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_AUTH': {
      return {
        onAuth: !state.onAuth,
      };
    }
    case 'AUTH_SIGNUP': {
      return {
        ...state,
      };
    }
    case 'AUTH_SIGNUP_REJECTED': {
      return {
        ...state,
        signUpErrMsg: action.err,
      };
    }
    case 'AUTH_SIGNIN': {
      return {
        ...state,
        data: action.payload.data,
        onAuth: !state.onAuth,
        info: action.payload,
      };
    }
    case 'AUTH_SIGNOUT': {
      return {
        ...state,
        onAuth: false,
        data: {},
        info: null,
      };
    }
    case 'ERROR_DEFAULT': {
      return {
        ...state,
        errMsg: '',
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
        errMsg: '',
      };
    }
  }
};

export default auth;
