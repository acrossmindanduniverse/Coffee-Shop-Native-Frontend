import {http} from '../../helpers/http';
// import {API_URL} from '@env';
// const API_URL = 'http://192.168.244.1:8000';
const API_URL = 'http://localhost:8000';

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

export const getChat = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${API_URL}/chat/room`);
    dispatch({
      type: 'GET_CHAT',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChatRoom = (token, recipient) => async dispatch => {
  console.log(token, recipient, 'chat action');
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
