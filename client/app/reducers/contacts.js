import {
    ADD_CONTACT
} from '../actions/contacts';

const defaultState = {
    contacts: [],
};

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