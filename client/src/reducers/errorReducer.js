import {
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/actionTypes';

const initialState = {
  message: {},
  status: null,
  id: null
};

const errorReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_ERRORS:
      return {
        ...state,
        ...payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        message: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
};

export default errorReducer;
