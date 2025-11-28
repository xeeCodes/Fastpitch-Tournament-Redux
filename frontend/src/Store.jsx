import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

import { eventInfoReducer } from './reducers/eventReducer';
import { registrationReducer } from './reducers/registerationReducer';
//initial states



const initialStates = {};

//combined redusers

const reducer = combineReducers({

    eventSlice: eventInfoReducer,
    registrationSlice:registrationReducer


}); 

//create middleware
const sagaMiddleware = createSagaMiddleware();

// reate store
const store = configureStore({

  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),

  preloadedState:initialStates
});


sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

//export store
export default store;