import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

const getErrors = ({ message, status, id }) => ({
  type: GET_ERRORS,
  payload: { message, status, id }
});

const clearErrors = () => ({ type: CLEAR_ERRORS });

const returnErrors = (error, id = null) => dispatch => {
  const { data, status } = error.response;

  const message =
    (data.error && data.error.message) || data;

  dispatch(getErrors({ message, status, id }));
};

export { returnErrors, clearErrors };
