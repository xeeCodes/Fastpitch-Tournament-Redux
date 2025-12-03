import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import {
  PLAYER_REGISTERATION_REQUEST,
  PLAYER_REGISTER_SUBMITTING,
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
  PLAYER_DEL_REQUEST,
  PLAYER_DEL_SUCCESS,
  PLAYER_DEL_FAIL,
  TEAM_REGISTER_SUBMITTING,
  TEAM_REGISTERATION_REQUEST,
  TEAM_REGISTER_SUCCESS,
  TEAM_REGISTER_FAIL,
  RESET_SINGLE_PLAYER,
} from "../constants/registerationConstants";
import api from "../api/axios";
import { playerListAction } from "../actions/registerationAction";

// ===== PLAYER REGISTER =====
function* postPlayerWorker(action) {
  try {
    yield put({ type: PLAYER_REGISTER_SUBMITTING });
    const response = yield call(api.post, `/api/player/registeration`, action.payload);
    yield put({ type: PLAYER_REGISTER_SUCCESS, payload: response.data });
    yield put(playerListAction());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: PLAYER_REGISTER_FAIL, payload: message });
  }
}

// ===== PLAYER LIST =====
function* allPlayerWorker() {
  try {
    const res = yield call(api.get, `/api/player/list`);
    yield put({ type: PLAYER_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: PLAYER_LIST_FAIL, payload: message });
  }
}

// ===== SINGLE PLAYER =====
function* getPlayerWorker(action) {
  try {
    const res = yield call(api.get, `/api/player/${action.payload}`);
    yield put({ type: PLAYER_SUCCESS, payload: res.data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: PLAYER_FAIL, payload: message });
  }
}

// ===== EDIT PLAYER =====
function* editPlayerWorker(action) {
  try {
    const { id, playerData } = action.payload;
    const res = yield call(api.put, `/api/player/update/${id}`, playerData);
    yield put({ type: PLAYER_EDIT_SUCCESS, payload: res.data });
    yield put(playerListAction());
    yield put({type:RESET_SINGLE_PLAYER})
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: PLAYER_EDIT_FAIL, payload: message });
  }
}

// ===== DELETE PLAYER =====
function* deletePlayerWorker(action) {
  try {
    const  id  = action.payload;
    const res = yield call(api.delete, `/api/player/del/${id}`);
    yield put({ type: PLAYER_DEL_SUCCESS, payload: res.data });
    yield put ({type:RESET_SINGLE_PLAYER})
    yield put(playerListAction());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: PLAYER_DEL_FAIL, payload: message });
  }
}

// ===== TEAM REGISTRATION =====
function* teamRegisterWorker(action) {
  try {
    yield put({ type: TEAM_REGISTER_SUBMITTING });
    const res = yield call(api.post, `/api/team/registeration`, action.payload);
    yield put({ type: TEAM_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put({ type: TEAM_REGISTER_FAIL, payload: message });
  }
}

// ===== WATCHERS =====
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

function* watchDeletePlayer() {
  yield takeLatest(PLAYER_DEL_REQUEST, deletePlayerWorker);
}

function* watchTeamRegister() {
  yield takeLatest(TEAM_REGISTERATION_REQUEST, teamRegisterWorker);
}

// ===== ROOT SAGA =====
export default function* registerationSaga() {
  yield all([
    watchPostPlayer(),
    watchAllPlayer(),
    watchGetPlayer(),
    watchEditPlayer(),
    watchDeletePlayer(),
    watchTeamRegister(),
  ]);
}
