import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import {
  PLAYER_REGISTER_SUBMITTING,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  TEAM_REGISTER_SUBMITTING,
  TEAM_REGISTER_SUCCESS,
  TEAM_REGISTER_FAIL,
  PLAYER_REGISTERATION_REQUEST,
  TEAM_REGISTERATION_REQUEST
} from '../constants/registerationConstants';
import api from "../api/axios";

function* postPlayerWorker(action) {

  try {


    yield put({ type: PLAYER_REGISTER_SUBMITTING });
    yield delay(4000);

    const response = yield call(api.post,`/api/player/registeration`, action.payload);

    yield put({ type: PLAYER_REGISTER_SUCCESS, payload: response.data });

  } catch (error) {

const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

      yield put({ type: PLAYER_REGISTER_FAIL, payload: message });
  }
}

function* postTeamWorker(action) {
  try {
    yield put({ type: TEAM_REGISTER_SUBMITTING });
    yield delay(4000);

    const response = yield call(api.post, `/api/team/registeration`, action.payload);
    yield put({ type: TEAM_REGISTER_SUCCESS, payload: response.data });

  } catch (error) {
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({ type: TEAM_REGISTER_FAIL, payload: message });
  }
}

function* watchPostPlayer() {
  yield takeLatest(PLAYER_REGISTERATION_REQUEST, postPlayerWorker);
}

function* watchPostTeam() {
  
  yield takeLatest(TEAM_REGISTERATION_REQUEST, postTeamWorker);
}

export default function* registerationSaga() {
  yield all([watchPostPlayer(), watchPostTeam()]);
}
