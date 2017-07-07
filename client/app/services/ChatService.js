import Config from '../config.json';

export default class ChatService {
    static getChatList(token) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/chats`, {
                method: 'GET',
                headers: {
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
}