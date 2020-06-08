import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from 'store';
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import 'index.scss';

const sagaMiddleware = createSagaMiddleware();
// redux dev tools in development
const middleware =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : compose(
        applyMiddleware(sagaMiddleware),
        // eslint-disable-next-line
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          // eslint-disable-next-line
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      );
const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

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
