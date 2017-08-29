import {
    INIT_USER,
    REGISTER_USER,
    LOGIN_USER,
} from '../actions/user';
import { initialState } from '../stores/state';

const defaultState = initialState.user;

export default function user(state = defaultState, action) {
    switch (action.type) {
        case INIT_USER:
            return defaultState;
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
        default:
            return state;
    }
}