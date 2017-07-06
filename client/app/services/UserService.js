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
                    response.json().then((body) => reject(this.checkResponseError(response.status, body)));
                }
            })
            .catch((error) => {
                reject(new Error("신규등록에 실패했습니다."));
            });
        });
    }
    static checkResponseError(status, body) {
        if (status === 409) {
            return new Error("이미 등록된 이메일입니다.");
        } else if (status === 400) {
            if (body.field == "email") {
                return new Error("올바르지 못한 형식의 이메일입니다.");
            } else if (body.field == "password") {
                return new Error("비밀번호는 8자 이상입니다.");
            } else {
                return new Error("신규등록에 실패했습니다.");    
            }
        } else {
            return new Error("신규등록에 실패했습니다.");
        }
    }
}