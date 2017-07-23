import Config from '../config.json';

export default class ChatService {
    static getChatList(token) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/chats`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
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
    static createChat(token, contactId) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    user_ids: [contactId],
                })
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error("새로운 채팅방을 만들지 못했습니다."));
                }
            }).then((body) => {
                resolve(body.chat_id);
            });
        });
    }
    static getChat(token, chatId) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/chats/${chatId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error("채팅방을 가져오는 데 실패하였습니다."));
                }
            }).then((body) => resolve(body));
        });
    }
    static sendMessage(token, chatId, senderId, msg) {
        const message = {
            date: new Date(),
            senderId,
            msg,
        };

        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/chats/${chatId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    msg: message,
                })
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