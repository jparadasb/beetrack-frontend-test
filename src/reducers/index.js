import { combineReducers } from 'redux';

import ContactsListReducer from './contacts-list-reducer';

const rootReducer = combineReducers({
  contactsListState: ContactsListReducer,
});

export default rootReducer;
