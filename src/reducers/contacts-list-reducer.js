import { GET_CONTACTS, SET_SEARCHBOX_FILTER, UPDATE_CONTACTS_LIST, GET_CONTACTS_ERROR } from '../constants';

const getInitialState = () => ({
  page: 1,
  limit: 5,
  contacts: [],
  errors: '',
  filterText: '',
  canGoNext: true,
  canGoPrev: false,
});

const ContactsListReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case GET_CONTACTS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case UPDATE_CONTACTS_LIST:
      return {
        ...state,
        errors: '',
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
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ContactsListReducer;
