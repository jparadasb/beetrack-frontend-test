import { combineReducers } from 'redux';

import UsersListReducer from './users-list';

const rootReducer = combineReducers({
  usersListState: UsersListReducer,
});

export default rootReducer;
