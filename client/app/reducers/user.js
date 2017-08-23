import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from '../actions/user';

const defaultUser = {
    email: '',
    name: '',
    authToken: null,
    lastLoggedIn: null,
    isLoggedIn: false,
};

export default function user(state = defaultUser, action) {
    switch (action.type) {
        case REGISTER_USER:
            return Object.assign({}, state, {
                email: action.email,
                authToken: null,
                lastLoggedIn: null,
                isLoggedIn: false,
            });
        case LOGIN_USER:
            return Object.assign({}, state, {
                email: action.email,
                authToken: action.authToken,
                lastLoggedIn: new Date(),
                isLoggedIn: true,
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                email: action.email,
                authToken: null,
                isLoggedIn: false,
            });
        default:
            return state;
    }
}