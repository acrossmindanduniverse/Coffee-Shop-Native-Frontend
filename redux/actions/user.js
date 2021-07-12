import {http} from '../../helpers/http';
import {API_URL} from '@env';

export const updateProfile = (token, id, userData) => async dispatch => {
  const form = new FormData();
  form.append('picture', userData.picture);
  form.append('name', userData.name);
  form.append('username', userData.username);
  form.append('phone_number', userData.phone_number);
  form.append('address', userData.user_address);
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
    console.log(err);
  }
};
