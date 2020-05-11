import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import './tachyonBoost.css';
import { selectViewReducer, selectItemReducer } from './reducers';
import App2 from './App2';

const rootReducer = combineReducers({selectViewReducer, selectItemReducer});
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App2  />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();