export default class User {
    static schema = {
        name: 'User',
        primaryKey: 'email',
        properties: {
            email: 'string',
            token: { type: 'string', optional: true },
            lastLogIn: 'date',
        },
    }
}