export const ADD_CONTACT = "ADD_CONTACT";

export function addContact(id, name) {
    return { type: ADD_CONTACT, id, name };
}