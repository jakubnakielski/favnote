import axios from 'axios';

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';
export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

const apiHost = 'http://localhost:9000/api/';

export const removeItem = (itemType, id) => {
  return {
    type: REMOVE_ITEM,
    payload: {
      itemType,
      id,
    },
  };
};

export const addItem = (itemType, itemContent) => {
  const getId = () => {
    const id = Math.random()
      .toString(36)
      .substr(2, 9);
    return `_${id}`;
  };
  return {
    type: ADD_ITEM,
    payload: {
      itemType,
      item: {
        id: getId(),
        ...itemContent,
      },
    },
  };
};

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTHENTICATE_REQUEST });
  return axios
    .post(`${apiHost}/user/login`, {
      username,
      password,
    })
    .then(result => {
      console.log(result);
      const payload = result;
      dispatch({ type: AUTHENTICATE_SUCCESS, payload });
    })
    .catch(err => {
      console.log(err);
      const payload = err;
      dispatch({ type: AUTHENTICATE_FAILURE, payload });
    });
};
