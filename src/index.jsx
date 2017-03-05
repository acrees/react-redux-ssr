import React from 'react'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './root';
import reducer from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducer, preloadedState);

//const store = createStore(reducer,
//  composeWithDevTools(
//    applyMiddleware()
//  )
//);

render(
  <Provider store={store}>
    <Root></Root>
  </Provider>,
  document.getElementById('app-container')
);
