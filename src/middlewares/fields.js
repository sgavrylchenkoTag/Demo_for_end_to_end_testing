import { put, takeEvery, call } from 'redux-saga/effects';
import get from 'lodash/get';

import {
  GET_FIELDS,
  SET_FIELDS,
  FIELDS_FAILURE,
} from 'Actions/constants';

import fetch from '../api/fetch';

function* getFieldsAsync() {
  try {
    const response = yield call(() => fetch({ method: 'GET', path: 'fields' }));

    yield put({ type: SET_FIELDS, payload: get(response, 'data') });
  } catch (error) {
    yield put({ type: FIELDS_FAILURE, payload: error });
  }
}

export default function* getFieldsData() {
  yield takeEvery(GET_FIELDS, getFieldsAsync);
}
