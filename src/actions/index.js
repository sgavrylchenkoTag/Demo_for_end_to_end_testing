import {
  GET_FIELDS,
  SET_FIELDS,
  FIELDS_FAILURE,
  SAVE_RECORD,
  SAVE_RECORD_FAILURE
} from './constants';

export const getFields = () => ({
  type: GET_FIELDS,
});

export const setFields = () => ({
  type: SET_FIELDS,
});

export const fieldsError = () => ({
  type: FIELDS_FAILURE,
});

export const saveRecord = record => ({
  type: SAVE_RECORD,
  payload: record,
});

export const saveRecordFailure = () => ({
  type: SAVE_RECORD_FAILURE,
});
