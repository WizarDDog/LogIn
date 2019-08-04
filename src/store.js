import { createStore, applyMiddleware } from 'redux';
import reducer from './Redux/reducer';
import createSagaMiddleware from 'redux-saga';
import saga from './Redux/saga';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)

export default store;