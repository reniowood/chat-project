import {
    ADD_CHAT,
    ADD_MESSAGE,
} from '../actions/chats';
import { initialState } from '../stores/state';

const defaultState = initialState.chats;

export default function chats(state = defaultState, action) {
    switch (action.type) {
        case ADD_CHAT:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    [action.id]: {
                        id: action.id,
                        name: action.name,
                        userIds: action.userIds,
                        messages: [],
                    }
                }),
                order: [
                    action.id,
                    ...state.order,
                ],
            });
        case ADD_MESSAGE:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    [action.chatId]: Object.assign({}, state.data[action.chatId], {
                        messages: [
                            ...state.data[action.chatId].messages,
                            {
                                key: state.data[action.chatId].messages.length,
                                senderId: action.senderId,
                                date: action.date,
                                message: action.message,
                            },
                        ]
                    })
                })
            });
        default:
            return state;
    }
}