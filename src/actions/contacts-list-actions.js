import {
  GET_CONTACTS,
  GET_CONTACT,
  GET_CONTACTS_ERROR,
  GET_CONTACT_ERROR,
  ADD_NEW_CONTACT,
  ADD_NEW_CONTACT_ERROR,
  UPDATE_CONTACTS_LIST,
  DELETE_CONTACT_ERROR,
  SET_SEARCHBOX_FILTER,
} from '../constants';

export const setSearchboxFilter = filterText => ({
  type: SET_SEARCHBOX_FILTER,
  payload: filterText,
});

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
      contacts: response,
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

export const deleteContact = contactId => (dispatch, getState, http) => {
  const { contacts } = getState().contactsListState;
  return http.delete(`api/users/${contactId}`)
    .then(() => dispatch({
      type: UPDATE_CONTACTS_LIST,
      payload: contacts.filter(contact => contact.id !== contactId),
    }))
    .catch(error => dispatch({
      type: DELETE_CONTACT_ERROR,
      payload: error,
    }));
};

