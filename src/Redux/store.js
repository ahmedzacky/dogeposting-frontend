import {createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'

const initialState = {};

const reducers = combineReducers({
    user: userReducer, 
    data: dataReducer, 
    ui: uiReducer
})

const middleware = [thunk];


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(...middleware));



window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, initialState, enhancer);



export default store