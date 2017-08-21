import HttpClient from '../utils/HttpClient';

export default class ChatService {
    static getChatList(authToken) {
        return new Promise((resolve, reject) => {
            HttpClient.fetchServer('chats', {
                method: 'GET',
                headers: HttpClient.getAuthHeaders(authToken),
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status == 401) {
                    reject(new Error("인증에 실패하였습니다."));
                } else {
                    reject(new Error("채팅 목록을 가져오는 데 실패하였습니다."));
                }
            }).then((body) => resolve(body.chats));
        });
    }
    static createChat(authToken, contactId) {
        return new Promise((resolve, reject) => {
            HttpClient.fetchServer('chats', {
                method: 'POST',
                headers: HttpClient.getAuthHeaders(authToken),
                body: {
                    user_ids: [contactId],
                }
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error("새로운 채팅방을 만들지 못했습니다."));
                }
            }).then((body) => {
                resolve({
                    chatId: body.chat_id,
                    name: body.name,
                });
            });
        });
    }
    static getChat(authToken, chatId) {
        return new Promise((resolve, reject) => {
            HttpClient.fetchServer(`chats/${chatId}`, {
                method: 'GET',
                headers: HttpClient.getAuthHeaders(authToken),
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error("채팅방을 가져오는 데 실패하였습니다."));
                }
            }).then((body) => resolve(body));
        });
    }
    static sendMessage(authToken, chatId, msg) {
        const message = {
            date: new Date(),
            msg,
        };

        return new Promise((resolve, reject) => {
            HttpClient.fetchServer(`chats/${chatId}`, {
                method: 'PUT',
                headers: HttpClient.getAuthHeaders(authToken),
                body: {
                    msg: message,
                }
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return resolve(message);
                } else {
                    reject(new Error("메세지를 보내지 못했습니다."));
                }
            });
        });
    }
}