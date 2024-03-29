import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import './tachyonBoost.css';
import rootReducer from './reducers';
import { SelectRecord, FetchItems } from './actions';
import { ContextProvider } from './Contexts/ContextProvider';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleware));

// store
//   .dispatch(fetchPostsIfNeeded('reactjs'))
//   .then(() => console.log(store.getState()))

store.dispatch(SelectRecord('reactjs')) ;
store.dispatch(FetchItems('reactjs'));


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ContextProvider>
        <App  />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
