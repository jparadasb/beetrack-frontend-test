import {
  GET_USERS,
  GET_USER,
  GET_USERS_ERROR,
  GET_USER_ERROR,
  ADD_NEW_USER,
  ADD_NEW_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
} from '../constants';

export const getAllUsers = (page, limit = 10) => (dispatch, getState, http) => http.get('api/users', {
  params: {
    _page: page,
    _limit: limit,
  },
})
  .then(response => dispatch({
    type: GET_USERS,
    payload: {
      page,
      limit,
      ...response,
    },
  }))
  .catch(error => dispatch({
    type: GET_USERS_ERROR,
    payload: error,
  }));

export const getUser = userId => (dispatch, getState, http) => http.get(`api/users/${userId}`)
  .then(response => dispatch({
    type: GET_USER,
    payload: response,
  }))
  .catch(error => dispatch({
    type: GET_USER_ERROR,
    payload: error,
  }));

export const addNewUser = ({
  name, email, description, photo,
}) => (dispatch, getState, http) => http.post('api/users', {
  name,
  email,
  description,
  photo,
})
  .then(response => dispatch({
    type: ADD_NEW_USER,
    payload: response,
  }))
  .catch(error => dispatch({
    type: ADD_NEW_USER_ERROR,
    payload: error,
  }));

export const deleteUser = userId => (dispatch, getState, http) => http.delete(`api/users/${userId}`)
  .then(response => dispatch({
    type: DELETE_USER,
    payload: response,
  }))
  .catch(error => dispatch({
    type: DELETE_USER_ERROR,
    payload: error,
  }));
