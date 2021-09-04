import {http} from '../../helpers/http';
// import {API_URL} from '@env';
// const API_URL = 'http://192.168.244.1:8000';
const API_URL = 'http://localhost:8000';

export const updateProfile = (token, id, userData) => async dispatch => {
  const form = new FormData();
  form.append('name', userData.name);
  form.append('username', userData.username);
  form.append('phone_number', userData.phone_number);
  form.append('user_address', userData.user_address);
  try {
    const {data} = await http(token, id).put(
      `${API_URL}/user/update-profile`,
      form,
    );
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        updated: data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_PROFILE_REJECTED',
      error: err.response.data.data,
    });
    throw err;
  }
};

export const uploadPicture = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('picture', {
    uri: setData.picture.uri,
    name: setData.picture.fileName,
    type: setData.picture.type,
  });
  try {
    const {data} = await http(token).put(
      `${API_URL}/user/upload-picture`,
      form,
    );
    dispatch({
      type: 'UPLOAD_PICTURE',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPLOAD_PICTURE_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const getUserSigned = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${API_URL}/user/signed`);
    dispatch({
      type: 'GET_USER_SIGNED',
      payload: {
        user: data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const confirmPassword = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('password', setData.password);
  try {
    const {data} = await http(token).post(
      `${API_URL}/user/confirm-password`,
      form,
    );
    dispatch({
      type: 'CONFIRM_PASSWORD',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'CONFIRM_PASSWORD_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const editPassword = (token, setData) => async dispatch => {
  const form = new URLSearchParams({
    password: setData.password,
    resendPassword: setData.resendPassword,
  });
  try {
    const {data} = await http(token).patch(
      `${API_URL}/user/update-password`,
      form,
    );
    dispatch({
      type: 'EDIT_PASSWORD',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'EDIT_PASSWORD_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const getUser = (token, key) => async dispatch => {
  try {
    const {data} = await http(token).get(`${API_URL}/user?search=${key}`);
    dispatch({
      type: 'GET_USER',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const getUserDefault = () => dispatch => {
  dispatch({
    type: 'USER_DEFAULT',
  });
};

export const errorDefault = () => dispatch => {
  dispatch({
    type: 'ERROR_DEFAULT',
  });
};

export const splashToggle = () => dispatch => {
  dispatch({
    type: 'SPLASH_TOGGLE',
  });
};

export const homeToggle = () => dispatch => {
  dispatch({
    type: 'HOME_TOGGLE',
  });
};
