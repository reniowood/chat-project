export const INIT_CONTACTS = "INIT_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";

export function initContacts() {
    return { type: INIT_CONTACTS };
}

export function addContact(id, name) {
    return { type: ADD_CONTACT, id, name };
}