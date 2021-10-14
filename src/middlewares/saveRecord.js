import { put, takeEvery, call } from 'redux-saga/effects';

import { SAVE_RECORD, SAVE_RECORD_FAILURE } from 'Actions/constants';

import fetch from '../api/fetch';

function* saveRecordAsync({ payload }) {
  try {
    yield call(() => fetch({ method: 'POST', path: 'record', body: payload }));
  } catch (error) {
    yield put({ type: SAVE_RECORD_FAILURE, payload: error });
  }
}

export default function* saveRecord() {
  yield takeEvery(SAVE_RECORD, saveRecordAsync);
}
