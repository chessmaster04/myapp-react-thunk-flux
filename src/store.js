import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import all_reducers from './reducers';

export const history = createBrowserHistory();

const reducers = combineReducers({
    ...all_reducers,
    router: connectRouter(history),
});

const initialState = {};
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware),
);

export default store;
