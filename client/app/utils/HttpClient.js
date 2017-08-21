import Config from '../config.json';

export default class HttpClient {
    static defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    static getAuthHeaders(authToken) {
        return Object.assign(this.defaultHeaders, {
            'Authorization': `Token ${authToken}`,
        });
    }
    static getBasicAuthHeaders(email, password) {
        return Object.assign(this.defaultHeaders, {
            'Authorization': 'Basic ' + base64.encode(`${email}:${password}`),
        });
    }
    static fetchServer(path, options) {
        return fetch(`${Config.API_URL}/${path}`, Object.assign(options, {
            body: JSON.stringify(options.body),
        }));
    }
}