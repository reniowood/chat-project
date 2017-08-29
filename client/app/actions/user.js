export const INIT_USER = "INIT_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

export function initUser() {
    return { type: INIT_USER };
}

export function registerUser(id, email) {
    return { type: REGISTER_USER, id, email };
}

export function loginUser(id, email, authToken) {
    return { type: LOGIN_USER, id, email, authToken };
}