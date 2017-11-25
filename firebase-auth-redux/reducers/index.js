import { SIGNUP_USER_PENDING, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, 
    SIGNIN_USER_PENDING, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE } from '../actions';

const authInitialState = { 
    isAuth: false, 
    token: '', 
    user: {},
    isSignup: false,
    isSignin: false,
    isSignupError: false,
    isSigninError: false,
    error: {}
};

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case SIGNUP_USER_PENDING:
            return {
                ...state,
                isAuth: false,
                token: '',
                user: {},
                isSignup: true
            };

        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                isSignup: false
            };

        case SIGNUP_USER_FAILURE:
            return {
                ...state,
                isSignup: false,
                isSignupError: true,
                error: action.payload
            };
            
        case SIGNIN_USER_PENDING:
            return {
                ...state,
                isSignin: true
            };

        case SIGNIN_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isSignin: false,
                token: action.payload.token,
                user: action.payload.user
            };

        case SIGNIN_USER_FAILURE:
            return {
                ...state,
                isSignin: false,
                isSigninError: true,
                error: action.payload
            };

        default:
            return state;
    }
};

export default authReducer;