import { combineReducers } from 'redux';
import user from './user';
import chats from './chats';
import contacts from './contacts';

const chatProject = combineReducers({
    user,
    chats,
    contacts
});

export default chatProject;