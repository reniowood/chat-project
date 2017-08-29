import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from '../actions/user';
import { initialState } from '../stores/state';

const defaultState = initialState.user;

export default function user(state = defaultState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return Object.assign({}, state, {
                id: action.id,
                email: action.email,
                authToken: null,
                lastLoggedIn: null,
                isLoggedIn: false,
            });
        case LOGIN_USER:
            return Object.assign({}, state, {
                id: action.id,
                email: action.email,
                authToken: action.authToken,
                lastLoggedIn: new Date(),
                isLoggedIn: true,
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                id: null,
                email: null,
                authToken: null,
                isLoggedIn: false,
            });
        default:
            return state;
    }
}