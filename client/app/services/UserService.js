import Config from '../config.json';
import PasswordNotConfirmedError from '../errors/PasswordNotConfirmedError';

export default class UserService {
    static register(email, password, confirmPassword) {
        return new Promise((resolve, reject) => {
            if (password !== confirmPassword) {
                reject(new PasswordNotConfirmedError("패스워드가 맞지 않습니다."));
            }

            fetch(`${Config.API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve();
                } else {
                    reject(new Error("신규등록에 실패했습니다."));
                }
            })
            .catch((error) => {
                console.error(error);
                reject(new Error("신규등록에 실패했습니다."));
            });
        });
    }
}