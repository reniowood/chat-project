import {
    INIT_CONTACTS,
    ADD_CONTACT,
} from '../actions/contacts';
import { initialState } from '../stores/state';

const defaultState = initialState.contacts;

export default function contacts(state = defaultState, action) {
    switch (action.type) {
        case INIT_CONTACTS:
            return defaultState;
        case ADD_CONTACT:
            return Object.assign({}, state, {
                byId: Object.assign({}, state.byId, {
                    [action.id]: {
                        id: action.id,
                        name: action.name,
                    }
                }),
                allIds: [
                    ...state.allIds,
                    action.id,
                ]
            });
        default:
            return state;
    }
}