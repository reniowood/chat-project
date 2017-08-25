import {
    ADD_CONTACT
} from '../actions/contacts';
import { initialState } from '../stores/state';

const defaultState = initialState.contacts;

export default function contacts(state = defaultState, action) {
    switch (action.type) {
        case ADD_CONTACT:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    [action.id]: {
                        id: action.id,
                        name: action.name,
                    }
                }),
                order: [
                    ...state.order,
                    action.id,
                ]
            });
        default:
            return state;
    }
}