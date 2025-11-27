import { call, put, takeLatest, all, delay} from "redux-saga/effects";

import {
    REGISTERATION_REQUEST,
    REGISTERATION_SUBMITTING,
    REGISTERATION_SUCCESS,
    REGISTERATION_FAIL,
    TEAM_REGISTER_REQUEST
} from '../constants/registerationConstants'

import api from "../api/axios";


//worker function for eventinfo

function* postPlayerWorker(action){


    try {

        //response from api
        const response = yield call(api.post, `/api/player/registeration`,
            action.payload
        )
        yield put({type:REGISTERATION_SUBMITTING});
                yield delay(5000);

        yield put({type:REGISTERATION_SUCCESS,payload:response.data}); 


        
        
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        yield put({type:REGISTERATION_FAIL,payload:message})
        
    }
}

function* postTeamWorker(action){


    try {

        //response from api
        const response = yield call(api.post, `/api/team/registeration`,
            action.payload
        )
        yield put({type:REGISTERATION_SUBMITTING});

        yield delay(5000);
        yield put({type:REGISTERATION_SUCCESS,payload:response.data});

        // yield put({type:POST_REGISTERATION})
        
        
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        yield put({type:REGISTERATION_FAIL,payload:message})
        
    }
}
// event info watcher
function* watchPostPlayer(){

    yield takeLatest(REGISTERATION_REQUEST,postPlayerWorker)
}

function* watchPostTeam(){

    yield takeLatest(TEAM_REGISTER_REQUEST,postTeamWorker)
}

//exportall sagas

export default function* registerationSaga(){

    yield all([watchPostPlayer(),watchPostTeam()]);
}