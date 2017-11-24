import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import AxiosThunks from './middlewares/axios-thunks';

import rootReducer from './reducers';
import UserListContainer from './containers/contacts-list';

require('./styles/main.scss');

const createStoreWithMiddleware = reducers => createStore(
  reducers,
  applyMiddleware(ReduxPromise, AxiosThunks, thunk),
);

const App = () => (
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <UserListContainer />
  </Provider>
);

render(<App />, document.getElementById('root'));
