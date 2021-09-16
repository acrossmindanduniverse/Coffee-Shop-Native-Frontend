import {http} from '../../helpers/http';
const API_URL = 'https://historycoffee.herokuapp.com';

export const getChat = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${API_URL}/chat/room`);
    console.log(data, 'test data list');
    dispatch({
      type: 'GET_CHAT',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendChat = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('message', setData.message);
  form.append('file', {
    uri: setData.file.uri,
    name: setData.file.name,
    type: setData.file.type,
  });
  form.append('recipient_id', setData.recipient_id);
  try {
    const {data} = await http(token).post(`${API_URL}/chat/send`, form);
    dispatch({
      type: 'SEND_CHAT',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChatRoom = (token, recipient) => async dispatch => {
  try {
    const {data} = await http(token).get(`${API_URL}/chat/${recipient}`);
    dispatch({
      type: 'GET_CHAT_ROOM',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteChatRoom = (token, id) => async dispatch => {
  try {
    const {data} = await http(token).put(
      `${API_URL}/chat/delete-chat-room/${id}`,
    );
    dispatch({
      type: 'DELETE_CHAT_ROOM',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const defaultState = () => dispatch => {
  dispatch({
    type: 'DEFAULT',
  });
};
