import {
  GET_CONTACTS,
  GET_CONTACT,
  GET_CONTACTS_ERROR,
  GET_CONTACT_ERROR,
  ADD_NEW_CONTACT,
  ADD_NEW_CONTACT_ERROR,
  DELETE_CONTACT,
  DELETE_CONTACT_ERROR,
} from '../constants';

export const getAllContacts = (page, limit = 10) => (dispatch, getState, http) => http.get('api/users', {
  params: {
    _page: page,
    _limit: limit,
  },
})
  .then(response => dispatch({
    type: GET_CONTACTS,
    payload: {
      page,
      limit,
      ...response,
    },
  }))
  .catch(error => dispatch({
    type: GET_CONTACTS_ERROR,
    payload: error,
  }));

export const getContact = userId => (dispatch, getState, http) => http.get(`api/users/${userId}`)
  .then(response => dispatch({
    type: GET_CONTACT,
    payload: response,
  }))
  .catch(error => dispatch({
    type: GET_CONTACT_ERROR,
    payload: error,
  }));

export const addNewContact = ({
  name, email, description, photo,
}) => (dispatch, getState, http) => http.post('api/users', {
  name,
  email,
  description,
  photo,
})
  .then(response => dispatch({
    type: ADD_NEW_CONTACT,
    payload: response,
  }))
  .catch(error => dispatch({
    type: ADD_NEW_CONTACT_ERROR,
    payload: error,
  }));

export const deleteContact = userId => (dispatch, getState, http) => http.delete(`api/users/${userId}`)
  .then(response => dispatch({
    type: DELETE_CONTACT,
    payload: response,
  }))
  .catch(error => dispatch({
    type: DELETE_CONTACT_ERROR,
    payload: error,
  }));
