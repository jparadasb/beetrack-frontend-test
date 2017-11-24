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

const Paginator = (dispatch, payload) => {
  let canGoNext = false;
  let canGoPrev = false;
  if (payload.page > 1) {
    canGoPrev = true;
  }
  if (payload.contacts.length > 0) {
    canGoNext = true;
  }

  if (payload.contacts.length < 1 && payload.page < 2) {
    return dispatch({
      type: GET_CONTACTS_ERROR,
      payload: 'No hay registros que mostrar',
    });
  }

  return dispatch({
    type: GET_CONTACTS,
    payload: {
      ...payload,
      canGoNext,
      canGoPrev,
    },
  });
};

export const setSearchboxFilter = filterText => ({
  type: SET_SEARCHBOX_FILTER,
  payload: filterText,
});

export const getAllContacts = (page, limit = 5) => (dispatch, getState, http) => http.get('api/users', {
  params: {
    _page: page,
    _limit: limit,
  },
})
  .then(response => Paginator(dispatch, {
    page,
    limit,
    contacts: response,
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
  name, description, photo,
}) => (dispatch, getState, http) => {
  const { page } = getState().contactsListState;
  return http.post('api/users', {
    name: name.value,
    description: description.value,
    photo: photo.value,
  })
    .then(response => dispatch({
      type: ADD_NEW_CONTACT,
      payload: response,
    }))
    .then(() => dispatch(getAllContacts(page)))
    .catch(error => dispatch({
      type: ADD_NEW_CONTACT_ERROR,
      payload: error,
    }));
};

export const deleteContact = contactId => (dispatch, getState, http) => {
  const { contacts, page } = getState().contactsListState;
  return http.delete(`api/users/${contactId}`)
    .then(() => dispatch({
      type: UPDATE_CONTACTS_LIST,
      payload: contacts.filter(contact => contact.id !== contactId),
    }))
    .then(() => dispatch(getAllContacts(page)))
    .catch(error => dispatch({
      type: DELETE_CONTACT_ERROR,
      payload: error,
    }));
};

