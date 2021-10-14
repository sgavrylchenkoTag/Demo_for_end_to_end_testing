import {
  GET_FIELDS,
  SET_FIELDS,
  FIELDS_FAILURE,
} from 'Actions/constants';

const initialState = {
  fields: [],
  spinner: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FIELDS:
      return { ...state, spinner: true, error: null };

    case SET_FIELDS:
      return { ...state, fields: action.payload, spinner: false };

    case FIELDS_FAILURE:
      return { ...state, spinner: false, error: action.payload.message };

    default:
      return state;
  }
};
