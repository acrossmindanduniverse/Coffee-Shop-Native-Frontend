const initialState = {
  data: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default user;
