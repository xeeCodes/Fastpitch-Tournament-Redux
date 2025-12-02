// sagas/registerationSaga.js

import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  PLAYER_REGISTERATION_REQUEST,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  PLAYER_LIST_REQUEST,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_REQUEST,
  PLAYER_SUCCESS,
  PLAYER_FAIL,
  PLAYER_EDIT_REQUEST,
  PLAYER_EDIT_SUCCESS,
  PLAYER_EDIT_FAIL,
} from '../constants/registerationConstants';
import api from "../api/axios";

// Register Player

function* postPlayerWorker(action) {
  try {
    yield put({ type: 'PLAYER_REGISTER_SUBMITTING' });
    const response = yield call(api.post, `/api/player/registeration`, action.payload);
    yield put({ type: PLAYER_REGISTER_SUCCESS, payload: response.data });

    yield put(playerListAction());
  } catch (error) {


    const message = error.response.data.message || error.message;
    yield put({ type: PLAYER_REGISTER_FAIL, payload: message });
  }
}

// Get All Players

function* allPlayerWorker() {
  try {
    const res = yield call(api.get, `/api/player/list`);
    yield put({ type: PLAYER_LIST_SUCCESS, payload: res.data });
  } catch (error) {


    const message = error.response.data.message || error.message;

    yield put({ type: PLAYER_LIST_FAIL, payload: message });
  }
 


  
}

// Get Single Player

function* getPlayerWorker(action) {

  try {

    const id = action.payload;
    const res = yield call(api.get, `/api/player/${id}`);
    yield put({ type: PLAYER_SUCCESS, payload: res.data });

  } catch (error) {
    const message = error.response.data.message || error.message;
    yield put({ type: PLAYER_FAIL, payload: message });
  }
}

// Edit Player worker

function* editPlayerWorker(action) {
  try {
    const { id, playerData } = action.payload; 
    const res = yield call(api.put, `/api/player/update/${id}`, playerData);
    yield put({ type: PLAYER_EDIT_SUCCESS, payload: res.data });
    yield put(playerListAction());

  } catch (error) {


    const message = error.response?.data.message || error.message;

    yield put({ type: PLAYER_EDIT_FAIL, payload: message });
  }
}


// Watcher functions

function* watchPostPlayer() {
  yield takeLatest(PLAYER_REGISTERATION_REQUEST, postPlayerWorker);
}

function* watchAllPlayer() {
  yield takeLatest(PLAYER_LIST_REQUEST, allPlayerWorker);
}

function* watchGetPlayer() {
  yield takeLatest(PLAYER_REQUEST, getPlayerWorker);
}

function* watchEditPlayer() {
  yield takeLatest(PLAYER_EDIT_REQUEST, editPlayerWorker);
}

export default function* registerationSaga() {
  yield all([
    watchPostPlayer(),
    watchAllPlayer(),
    watchGetPlayer(),
    watchEditPlayer(),
  ]);
}