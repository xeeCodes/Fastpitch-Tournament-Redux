import {all} from 'redux-saga/effects';
import eventSaga from './eventSaga';
import registerationSaga from './registerationSaga';

export default function* rootSaga() {
  yield all([eventSaga(),registerationSaga()]);
}