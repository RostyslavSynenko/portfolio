import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './actionTypes';
import { returnErrors } from './errorActions';

const userLoading = () => ({ type: USER_LOADING });

const userLoaded = user => ({
  type: USER_LOADED,
  payload: user
});

const authError = () => ({ type: AUTH_ERROR });

const loginSuccess = ({ token, user }) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user }
});

const registerSuccess = ({ token, user }) => ({
  type: REGISTER_SUCCESS,
  payload: { token, user }
});

const loginFail = () => ({ type: LOGIN_FAIL });

const logout = () => ({ type: LOGOUT_SUCCESS });

const registerFail = () => ({ type: REGISTER_FAIL });

const loadUser = httpService => () => async dispatch => {
  try {
    dispatch(userLoading());

    const {
      data: { data }
    } = await httpService.getUser();

    dispatch(userLoaded(data));
  } catch (error) {
    dispatch(authError());
    dispatch(returnErrors(error));
  }
};

const registerUser = httpService => ({
  name,
  email,
  password
}) => async dispatch => {
  try {
    const {
      data: { data }
    } = await httpService.registerUser({
      name,
      email,
      password
    });

    dispatch(registerSuccess(data));
    console.log(
      `New user has been created: ${data.user.email}`
    );

    return data;
  } catch (error) {
    dispatch(registerFail());
    dispatch(returnErrors(error, REGISTER_FAIL));
  }
};

const login = httpService => ({
  email,
  password
}) => async dispatch => {
  try {
    dispatch(userLoading());

    const {
      data: { data }
    } = await httpService.login({
      email,
      password
    });

    dispatch(loginSuccess(data));

    return data;
  } catch (error) {
    dispatch(loginFail());
    dispatch(returnErrors(error, LOGIN_FAIL));
  }
};

export { loadUser, registerUser, logout, login };
