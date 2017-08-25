import { createStore } from 'redux';
import ChatProject from '../reducers/index';

const store = createStore(ChatProject);

export default store;