const initialState = {
  send: [],
  latest: [],
  room: [],
  deleteToggle: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_CHAT': {
      return {
        ...state,
        send: action.payload,
      };
    }
    case 'GET_CHAT': {
      return {
        ...state,
        latest: action.payload,
      };
    }
    case 'GET_CHAT_ROOM': {
      return {
        ...state,
        room: action.payload,
      };
    }
    case 'DELETE_CHAT_ROOM': {
      return {
        ...state,
        deleteToggle: !state.deleteToggle,
      };
    }
    case 'DEFAULT': {
      return {
        ...state,
        deleteToggle: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chat;
