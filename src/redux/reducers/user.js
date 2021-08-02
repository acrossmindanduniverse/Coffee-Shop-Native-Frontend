const initialState = {
  onToggle: false,
  user: {},
  data: {},
  errMsg: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_BAR': {
      return {
        onToggle: !state.onToggle,
      };
    }
    case 'GET_USER_SIGNED': {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        data: action.payload,
        user: action.payload.user,
      };
    }
    case 'UPLOAD_FAILED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default user;
