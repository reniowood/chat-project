import {
    INIT_CHATS,
    ADD_CHAT,
    ADD_MESSAGE,
} from '../actions/chats';
import { initialState } from '../stores/state';

const defaultState = initialState.chats;

function createMessageId(chatId, senderId, date) {
    return `${chatId}:${senderId}:${new Date(date).getTime()}`;
}

function convertMessages(messages) {
    let convertedMessages = {};
    
    messages.map(({id, sender_id, msg}) => {
        const key = createMessageId(id, sender_id, msg.date);
        convertedMessages[key] = {
            key,
            senderId: sender_id,
            date: msg.date,
            message: msg.msg,
        }
    });

    return convertedMessages;
}

function createMessageIds(messages) {
    return messages.map(({id, sender_id, msg}) => createMessageId(id, sender_id, msg.date));
}

export default function chats(state = defaultState, action) {
    switch (action.type) {
        case INIT_CHATS:
            return defaultState;
        case ADD_CHAT:
            const messages = convertMessages(action.messages);
            const messageIds = createMessageIds(action.messages);

            return Object.assign({}, state, {
                chats: Object.assign({}, state.chats, {
                    byId: Object.assign({}, state.chats.byId, {
                        [action.id]: {
                            id: action.id,
                            name: action.name,
                            userIds: action.userIds,
                            messages: messageIds,
                        }
                    }),
                    allIds: [
                        ...state.chats.allIds,
                        action.id,
                    ],
                }),
                messages: Object.assign({}, state.messages, {
                    byId: Object.assign({}, state.messages.byId, messages),
                    allIds: [
                        ...state.messages.allIds,
                        messageIds,
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