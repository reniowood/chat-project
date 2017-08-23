export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function registerUser(email) {
    return { type: REGISTER_USER, email };
}

export function loginUser(email, authToken) {
    return { type: LOGIN_USER, email, authToken };
}

export function logoutUser() {
    return { type: LOGOUT_USER, email };
}