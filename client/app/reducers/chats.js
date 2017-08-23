import {
    ADD_CHAT,
    ADD_MESSAGE,
} from '../actions/chats';

const defaultChats = {
    chats: [],
};

export default function chats(state = defaultChats, action) {
    switch (action.type) {
        case ADD_CHAT:
            return Object.assign({}, state, {
                chats: [
                    ...state.chats,
                    {
                        id: action.id,
                        name: action.name,
                        userId: action.userId,
                        messages: action.messages,
                    }
                ],
            });
        case ADD_MESSAGE:
            return Object.assign({}, state, {
                chats: state.chats.map((chat) => {
                    if (chat.id === action.chatId) {
                        return Object.assign({}, chat, {
                            messages: [
                                ...chat.messages,
                                {
                                    senderId: action.senderId,
                                    date: new Date(),
                                    message: action.message,
                                },
                            ],
                        })
                    } else {
                        return chat;
                    }
                }),
            });
        default:
            return state;
    }
}