import { all } from 'redux-saga/effects';
import getFieldsData from './fields';
import saveRecord from './saveRecord';

export default function* rootSaga() {
  yield all([getFieldsData(), saveRecord()]);
}
