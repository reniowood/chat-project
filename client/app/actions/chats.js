export const INIT_CHATS = "INIT_CHATS";
export const ADD_CHAT = "ADD_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";

export function initChats() {
    return { type: INIT_CHATS };
}

export function addChat(id, name, userIds, messages) {
    return { type: ADD_CHAT, id, name, userIds, messages };
}

export function addMessage(chatId, senderId, date, message) {
    return { type: ADD_MESSAGE, chatId, senderId, date, message };
}