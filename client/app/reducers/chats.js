import {
    ADD_CHAT,
    ADD_MESSAGE,
} from '../actions/chats';
import { initialState } from '../stores/state';

const defaultState = initialState.chats;

function createMessageId(chatId, senderId, date) {
    return `${chatId}:${senderId}:${new Date(date).getTime()}:${new Date().getTime()}`;
}

export default function chats(state = defaultState, action) {
    switch (action.type) {
        case ADD_CHAT:
            return Object.assign({}, state, {
                chats: Object.assign({}, state.chats, {
                    byId: Object.assign({}, state.chats.byId, {
                        [action.id]: {
                            id: action.id,
                            name: action.name,
                            userIds: action.userIds,
                            messages: [],
                        }
                    }),
                    allIds: [
                        ...state.chats.allIds,
                        action.id,
                    ],
                }),
            });
        case ADD_MESSAGE:
            const messageId = createMessageId(action.chatId, action.senderId, action.date);

            return Object.assign({}, state, {
                chats: Object.assign({}, state.chats, {
                    byId: Object.assign({}, state.chats.byId, {
                        [action.chatId]: Object.assign({}, state.chats.byId[action.chatId], {
                            messages: [
                                ...state.chats.byId[action.chatId].messages,
                                messageId,
                            ],
                        }),
                    }),
                }),
                messages: Object.assign({}, state.messages, {
                    byId: Object.assign({}, state.messages.byId, {
                        [messageId]: {
                            key: messageId,
                            senderId: action.senderId,
                            date: action.date,
                            message: action.message,
                        },
                    }),
                    allIds: [
                        ...state.messages.allIds,
                        messageId,
                    ],
                }),
            });
        default:
            return state;
    }
}