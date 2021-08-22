const initialState = {
  splash: false,
  home: false,
  onToggle: false,
  pictureToggle: false,
  user: {},
  updated: {},
  picture: {},
  findUser: [],
  findUserErr: '',
  pictureErr: '',
  updateErrMsg: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SPLASH_TOGGLE': {
      return {
        ...state,
        splash: !state.splash,
      };
    }
    case 'HOME_TOGGLE': {
      return {
        ...state,
        home: !state.home,
        splash: state.splash,
      };
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        updated: action.payload.updated,
        onToggle: !state.onToggle,
        updateErrMsg: '',
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        onToggle: state.onToggle,
        updateErrMsg: action.error,
      };
    }
    case 'UPLOAD_PICTURE': {
      return {
        ...state,
        pictureToggle: !state.pictureToggle,
      };
    }
    case 'UPLOAD_PICTURE_REJECTED': {
      return {
        ...state,
        pictureErr: action.error,
        pictureToggle: state.pictureToggle,
      };
    }
    case 'CONFIRM_PASSWORD': {
      return {
        ...state,
        onToggle: !state.onToggle,
      };
    }
    case 'CONFIRM_PASSWORD_REJECTED': {
      return {
        ...state,
        updateErrMsg: action.error,
        onToggle: state.onToggle,
      };
    }
    case 'EDIT_PASSWORD': {
      return {
        ...state,
        onToggle: !state.onToggle,
      };
    }
    case 'EDIT_PASSWORD_REJECTED': {
      return {
        ...state,
        updateErrMsg: action.error,
        onToggle: state.onToggle,
      };
    }
    case 'GET_USER': {
      return {
        ...state,
        findUser: action.payload,
      };
    }
    case 'GET_USER_REJECTED': {
      return {
        ...state,
        findUserErr: action.error,
      };
    }
    case 'ERROR_DEFAULT': {
      return {
        ...state,
        onToggle: false,
        pictureToggle: false,
        pictureErr: '',
        findUser: '',
        updateErrMsg: '',
      };
    }
    case 'GET_USER_SIGNED': {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case 'USER_DEFAULT': {
      return {
        ...state,
        onToggle: false,
        user: {},
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default user;
