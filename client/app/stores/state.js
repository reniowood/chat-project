export const initialState = {
    user: {
        email: '',
        name: '',
        authToken: null,
        lastLoggedIn: null,
        isLoggedIn: false,
    },
    chats: {
        chats: {
            byId: {},
            allIds: [],
        },
        messages: {
            byId: {},
            allIds: [],
        },
    },
    contacts: {
        byId: {},
        allIds: [],
    },
};