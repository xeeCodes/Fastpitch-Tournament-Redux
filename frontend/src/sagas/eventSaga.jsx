import { call, put, takeLatest, all, select } from "redux-saga/effects";

import {
    EVENT_INFO_REQUEST,
    EVENT_INFO_SUCCESS,
    EVENT_INFO_FAIL,
} from '../constants/eventconstants'

import api from "../api/axios";


//worker function for eventinfo

function* fetchEventWorker(action){


    try {

        //response from api
        const id = action.payload;
        const response = yield call(api.get, `/api/event/${id}`)

        yield put({type:EVENT_INFO_SUCCESS,payload:response.data});
        
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        yield put({type:EVENT_INFO_FAIL,payload:message})
        
    }
}

// event info watcher
function* watchFetchEvent(){

    yield takeLatest(EVENT_INFO_REQUEST,fetchEventWorker)
}

//exportall sagas

export default function* eventSaga(){

    yield all([watchFetchEvent()]);
}