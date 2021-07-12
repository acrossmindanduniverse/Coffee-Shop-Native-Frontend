import {http} from '../../helpers/http';
import {API_URL} from '@env';

export const authSignUp =
  (username, password, resend_password, phone_number) => async dispatch => {
    try {
      const {data} = await http().post(
        `${API_URL}/auth/signup`,
        username,
        password,
        resend_password,
        phone_number,
      );
      dispatch({
        type: 'AUTH_SIGNUP',
        payload: data.data,
      });
    } catch (err) {
      console.log(err);
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
