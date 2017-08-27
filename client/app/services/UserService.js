import FCM from 'react-native-fcm';
import HttpClient from '../utils/HttpClient';
import User from '../models/User';

export default class UserService {
    static register(email, name, password, confirmPassword) {
        const defaultErrorMessage = "신규등록에 실패했습니다.";

        function checkRegisterResponseError(status, body) {
            if (status === 409) {
                return new Error("이미 등록된 이메일입니다.");
            } else if (status === 400) {
                if (body.field == "email") {
                    return new Error("올바르지 못한 형식의 이메일입니다.");
                } else if (body.field == "password") {
                    return new Error("비밀번호는 8자 이상입니다.");
                } else {
                    return new Error(defaultErrorMessage);    
                }
            } else {
                return new Error(defaultErrorMessage);
            }
        }

        return new Promise((resolve, reject) => {
            if (password !== confirmPassword) {
                reject(new Error("패스워드가 맞지 않습니다."));
            }

            HttpClient.fetchServer('users', {
                method: 'POST',
                headers: HttpClient.defaultHeaders,
                body: {
                    email,
                    name,
                    password,
                },
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve();
                } else {
                    response.json().then((body) => reject(this.checkRegisterResponseError(response.status, body)));
                }
            }).catch((error) => {
                reject(new Error(defaultErrorMessage));
            });
        });
    }
    static getAuthToken(email, password) {
        return new Promise((resolve, reject) => {
            HttpClient.fetchServer('token', {
                method: 'GET',
                headers: HttpClient.getBasicAuthHeaders(email, password),
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
                        id: body.id,
                        authToken: body.token,
                    });
                }
            });
        });
    }
    static updateFCMToken(authToken) {
        const defaultErrorMessage = "푸시 등록에 실패했습니다.";
        
        return new Promise((resolve, reject) => {
            FCM.getFCMToken().then((fcmToken) => {
                HttpClient.fetchServer('users/fcm_token', {
                    method: 'PUT',
                    headers: HttpClient.getAuthHeaders(authToken),
                    body: {
                        fcm_token: fcmToken,
                    },
                }).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve();
                    } else {
                        reject(new Error(defaultErrorMessage));
                    }
                }).catch((error) => {
                    console.log(error);
                    reject(new Error(defaultErrorMessage));
                });
            });
        });
    }
    static getContacts(authToken) {
        const defaultErrorMessage = "연락처 불러오기에 실패했습니다.";

        return new Promise((resolve, reject) => {
            HttpClient.fetchServer('users/contacts', {
                method: 'GET',
                headers: HttpClient.getAuthHeaders(authToken),
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(new Error(defaultErrorMessage));
                }
            }).then((body) => {
                if (body !== undefined) {
                    resolve(body);
                }
            });
        });
    }
    static addContact(authToken, email) {
        const defaultErrorMessage = "연락처를 추가하지 못했습니다.";

        function checkAddContactResponseError(status) {
            if (status === 409) {
                return new Error("이미 연락처에 있는 이메일입니다.");
            } else if (status === 406) {
                return new Error("연락처로 등록할 수 없는 이메일입니다.");
            } else if (status === 404) {
                return new Error("없는 사용자입니다.");
            } else {
                return new Error(defaultErrorMessage);
            }
        }

        return new Promise((resolve, reject) => {
            HttpClient.fetchServer('users/contacts', {
                method: 'POST',
                headers: HttpClient.getAuthHeaders(authToken),
                body: {
                    email,
                },
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    reject(checkAddContactResponseError(response.status));
                }
            }).then((body) => {
                if (body !== undefined) {
                    resolve(body);
                }
            }).catch((error) => {
                console.log(error);
                reject(new Error(defaultErrorMessage));
            });
        });
    }
}