import base64 from 'base-64';
import Realm from 'realm';
import Config from '../config.json';
import PasswordNotConfirmedError from '../errors/PasswordNotConfirmedError';
import FCMService from './FCMService';
import User from '../models/User';

let realm = new Realm({ schema: [User] });

export default class UserService {
    static register(email, name, password, confirmPassword) {
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
                    name,
                    password,
                }),
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve();
                } else {
                    response.json().then((body) => reject(this.checkRegisterResponseError(response.status, body)));
                }
            }).catch((error) => {
                reject(new Error("신규등록에 실패했습니다."));
            });
        });
    }
    static checkRegisterResponseError(status, body) {
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
    static getAuthToken(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/token`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + base64.encode(`${email}:${password}`),
                },
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status == 401) {
                    reject(new Error("잘못된 이메일 혹은 비밀번호입니다."));
                } else {
                    reject(new Error("로그인에 실패했습니다."));
                }
            }).then((body) => {
                if (body !== undefined) {
                    resolve({
                        userId: body.id,
                        authToken: body.token,
                    });
                }
            });
        });
    }
    static getLastUser() {
        const users = realm.objects('User').sorted('lastLoggedIn');
        
        return users[users.length - 1];
    }
    static saveAuthToken(email, authToken) {
        const users = realm.objects('User').filtered(`email = "${email}"`);
        
        if (users.length == 0) {
            realm.write(() => {
                const user = realm.create('User', {
                    email,
                    authToken,
                    lastLoggedIn: new Date(),
                    isLoggedIn: true,
                });
            });
        } else {
            const user = users[0];
            realm.write(() => {
                user.authToken = authToken;
                user.lastLoggedIn = new Date();
                user.isLoggedIn = true;
            });
        }
    }
    static updateFCMToken(authToken, id) {
        return new Promise((resolve, reject) => {
            FCMService.getFCMToken((fcmToken) => {
                fetch(`${Config.API_URL}/users/${id}/fcm_token`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`,
                    },
                    body: JSON.stringify({
                        fcm_token: fcmToken,
                    }),
                }).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve();
                    } else {
                        reject(new Error("푸시 등록에 실패했습니다."));
                    }
                }).catch((error) => {
                    reject(new Error("푸시 등록에 실패했습니다."));
                });
            });
        });
    }
    static getContacts(authToken, id) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API_URL}/users/${id}/contacts`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error("연락처 불러오기에 실패했습니다."));
                }
            }).then((body) => {
                if (body !== undefined) {
                    resolve(body);
                }
            });
        });
    }
}