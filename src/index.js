import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { Router, BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// 1.Redux DevTools 사용하기
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, applyMiddleware(myLogger, logger));  // 여러개의 미들웨이 적용가능
const store = createStore(
  rootReducer, 
  composeEnhancers(
    // logger를 사용하는 경우 logger가 가장 마지막에 위치 해야된다.
    applyMiddleware(
      thunk,
      sagaMiddleware,
      logger    // 2.redux-logger 사용하기
    )   
  )
); 

sagaMiddleware.run(rootSaga);   // 스토어 생성이 된 다음에 실행되어야 한다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
