import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from 'store';
import App from 'App';
import 'index.scss';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line
    !(window as any).Cypress &&
    // eslint-disable-next-line
    (window as any).__REDUX_DEVTOOLS_EXTENSION__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
