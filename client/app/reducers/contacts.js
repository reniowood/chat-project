import {
    ADD_CONTACT
} from '../actions/contacts';
import { initialState } from '../stores/state';

const defaultState = initialState.contacts;

export default function contacts(state = defaultState, action) {
    switch (action.type) {
        case ADD_CONTACT:
            return Object.assign({}, state, {
                contacts: [
                    ...state.contacts,
                    {
                        id: action.id,
                        name: action.name,
                    },
                ],
            });
        default:
            return state;
    }
}