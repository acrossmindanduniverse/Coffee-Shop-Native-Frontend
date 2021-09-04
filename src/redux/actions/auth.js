import {http} from '../../helpers/http';
// import {API_URL} from '@env';

// const API_URL = 'http://192.168.244.1:8000';
const API_URL = 'http://localhost:8000';

export const toggleAuth = () => dispatch => {
  dispatch({
    type: 'TOGGLE_AUTH',
  });
};

export const errorDefault = () => dispatch => {
  dispatch({
    type: 'ERROR_DEFAULT',
  });
};

export const authSignUp =
  (username, password, phone_number) => async dispatch => {
    try {
      const {data} = await http().post(
        `${API_URL}/auth/signup`,
        username,
        password,
        phone_number,
      );
      dispatch({
        type: 'AUTH_SIGNUP',
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_SIGNUP_REJECTED',
        error: err.response.data.data,
      });
      console.log(err);
    }
  };

export const registerFcmToken = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('token', setData.token);
  try {
    const {data} = await http(token).post(`${API_URL}/auth/fcm-token`, form);
    dispatch({
      type: 'REGISTER_TOKEN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'REGISTER_TOKEN_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const authSignIn = (username, password, info) => async dispatch => {
  try {
    const {data} = await http(info).post(
      `${API_URL}/auth/signin`,
      username,
      password,
    );
    dispatch({
      type: 'AUTH_SIGNIN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_SIGNIN_REJECTED',
      err: err.response.data.data,
    });
  }
};

export const authRefreshToken = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('refreshToken', setData.refreshToken);
  try {
    const {data} = await http(token).post(
      `${API_URL}/auth/refresh-token`,
      form,
    );
    dispatch({
      type: 'REFRESH_TOKEN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'REFRESH_TOKEN_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const authSignOut = () => dispatch => {
  dispatch({
    type: 'AUTH_SIGNOUT',
  });
};
