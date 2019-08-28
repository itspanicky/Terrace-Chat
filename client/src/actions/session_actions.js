import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const receiveCurrentUser = (decoded, user)=> ({
    type: RECEIVE_CURRENT_USER,
    user, 
    decoded
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken')
    // Remove the token from the common axios header
    APIUtil.setAuthToken(false)
    // Dispatch a logout action
    dispatch(logoutUser())
};

export const signup = user => dispatch => (
    APIUtil.signup(user).then((res) => {
        debugger
        const { user, token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded, user));
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const login = (user) => dispatch => {
    APIUtil.login(user).then(res => {
        const { user, token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded, user));
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
}