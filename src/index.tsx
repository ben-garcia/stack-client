import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import { rootReducer } from 'store';

import * as serviceWorker from 'serviceWorker';
import App from 'App';
import 'index.scss';

const store = createStore(
  rootReducer,
  compose(
    // applyMiddleware(sagaMiddleware),
    // redux dev tools
    // NOTE: remove when building static files for production
    // eslint-disable-next-line
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      // eslint-disable-next-line
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
