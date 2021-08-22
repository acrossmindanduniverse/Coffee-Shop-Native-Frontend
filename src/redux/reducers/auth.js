const initialState = {
  onAuth: false,
  onToggle: false,
  refreshToken: null,
  fcmToken: null,
  data: {},
  info: null,
  signUpErrMsg: '',
  fcmTokenErr: '',
  errMsg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SIGNUP': {
      return {
        ...state,
        onToggle: !state.onToggle,
      };
    }
    case 'AUTH_SIGNUP_REJECTED': {
      return {
        ...state,
        signUpErrMsg: action.error,
        onToggle: state.onToggle,
      };
    }
    case 'AUTH_SIGNIN': {
      return {
        ...state,
        onAuth: !state.onAuth,
        info: action.payload,
      };
    }
    case 'REFRESH_TOKEN': {
      return {
        ...state,
        refreshToken: action.payload,
      };
    }
    case 'REFRESH_TOKEN_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
      };
    }
    case 'REGISTER_TOKEN': {
      return {
        ...state,
        fcmToken: action.payload,
      };
    }
    case 'REGISTER_TOKEN_REJECTED': {
      return {
        ...state,
        fcmTokenErr: action.error,
      };
    }
    case 'AUTH_SIGNOUT': {
      return initialState;
    }
    case 'AUTH_SIGNIN_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
        onAuth: state.onAuth,
      };
    }
    case 'ERROR_DEFAULT': {
      return {
        ...state,
        errMsg: '',
        fcmTokenErr: '',
        onToggle: false,
        onAuth: state.onAuth,
        signUpErrMsg: '',
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
