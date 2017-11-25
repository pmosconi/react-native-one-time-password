import axios from 'axios';
import firebase from 'firebase';

export const SIGNUP_USER_PENDING = 'signup_user_PENDING';
export const SIGNUP_USER_SUCCESS = 'signup_user_SUCCESS';
export const SIGNUP_USER_FAILURE = 'signup_user_FAILURE';

export const SIGNIN_USER_PENDING = 'signin_user_PENDING';
export const SIGNIN_USER_SUCCESS = 'signin_user_SUCCESS';
export const SIGNIN_USER_FAILURE = 'signin_user_FAILURE';

// SIGNUP_USER ACTIONS
export const signupUserPending =  () => {
    return { type: SIGNUP_USER_PENDING };
};

export const signupUserSuccess = () => {
    return { type: SIGNUP_USER_SUCCESS };
};

export const signupUserFailure = (err) => {
    return { 
        type: SIGNUP_USER_FAILURE,
        payload: err
     };
};

// SignupUser Action for Container
export const signupUser = phone => {
    return async dispatch => {
        dispatch(signupUserPending());
        try {
            await _signupUser(phone);
            dispatch(signupUserSuccess());
        }
        catch (err) {
            dispatch(signupUserFailure(err.response.data.error.message));
        }
    }
};

// SIGNIN_USER ACTIONS
export const signinUserPending =  () => {
    return { type: SIGNIN_USER_PENDING };
};

export const signinUserSuccess = (data) => {
    return { 
        type: SIGNIN_USER_SUCCESS,
        payload: data
     };
};

export const signinUserFailure = (err) => {
    return { 
        type: SIGNIN_USER_FAILURE,
        payload: err
     };
};

// SigninUser Action for Container
export const signinUser = (phone, code) => {
    return async dispatch => {
        dispatch(signinUserPending());
        try {
            const data = await _signinUser(phone, code);
            dispatch(signinUserSuccess(data));
        }
        catch (err) {
            let msg = '';
            if (err.response.data.error.message)
                msg = err.response.data.error.message;
            else
                msg = err.response.data.error;
            dispatch(signinUserFailure(msg));
        }
    }
};

// PRIVATE FUNCTIONS

const BASE_URL = 'https://us-central1-one-time-password-6d0f9.cloudfunctions.net';

// SignupUser API
const _signupUser = async (phone) => {
    await axios.post(`${BASE_URL}/createUser`, { phone });
    return axios.post(`${BASE_URL}/requestOneTimePassword`, { phone });
};

// SigninUser API
const _signinUser = async (phone, code) => {
    const { data } = await axios.post(`${BASE_URL}/verifyOneTimePassword`, { phone, code });
    const  user = await firebase.auth().signInWithCustomToken(data.token);
    return { token: data.token, user };
};