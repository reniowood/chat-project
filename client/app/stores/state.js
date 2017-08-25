export const initialState = {
    user: {
        email: '',
        name: '',
        authToken: null,
        lastLoggedIn: null,
        isLoggedIn: false,
    },
    chats: {
        data: {},
        order: [],
    },
    contacts: {
        data: {},
        order: [],
    },
};