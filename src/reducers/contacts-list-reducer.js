import { GET_CONTACTS, SET_SEARCHBOX_FILTER, UPDATE_CONTACTS_LIST } from '../constants';

const getInitialState = () => ({
  page: 1,
  limit: 10,
  contacts: [],
  filterText: '',
});

const ContactsListReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_CONTACTS_LIST:
      return {
        ...state,
        contacts: action.payload,
      };
    case SET_SEARCHBOX_FILTER:
      return {
        ...state,
        filterText: action.payload,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
};

export default ContactsListReducer;
