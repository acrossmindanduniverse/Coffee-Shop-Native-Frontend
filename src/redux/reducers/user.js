const initialState = {
  onToggle: false,
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
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        data: action.payload,
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
