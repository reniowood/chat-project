export default class User {
    static schema = {
        name: 'User',
        primaryKey: 'email',
        properties: {
            email: 'string',
            authToken: { type: 'string', optional: true },
            lastLoggedIn: 'date',
            isLoggedIn: 'bool',
        },
    }
}