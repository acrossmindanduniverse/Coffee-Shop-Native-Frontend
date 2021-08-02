import {http} from '../../helpers/http';
import {API_URL} from '@env';

export const updateProfile = (token, id, userData) => async dispatch => {
  const form = new FormData();
  form.append('picture', {
    uri: userData.picture.uri,
    name: userData.picture.fileName,
    type: userData.picture.type,
  });
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
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPLOAD_FAILED',
      payload: err.response.data.data,
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

export const onToggleBar = () => dispatch => {
  dispatch({
    type: 'TOGGLE_BAR',
  });
};
