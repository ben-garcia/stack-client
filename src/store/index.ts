import { createStore, /* applyMiddleware, */ compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
// import rootSaga from '../sagas';

// const sagaMiddleware = createSagaMiddleware();

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

// sagaMiddleware.run(rootSaga);

export default store;
