export const ADD_CHAT = "ADD_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";

export function addChat(id, name, userId, messages) {
    return { type: ADD_CHAT, id, name, userId, messages };
}

export function addMessage(chatId, senderId, date, message) {
    return { type: ADD_MESSAGE, chatId, date, message };
}