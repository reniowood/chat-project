import { Navigation } from 'react-native-navigation';

import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import ChatList from './ChatList';
import Contacts from './Contacts';
import ChatRoom from './ChatRoom';

export function registerScreens() {
    Navigation.registerComponent('com.client.Splash', () => Splash);
    Navigation.registerComponent('com.client.Login', () => Login);
    Navigation.registerComponent('com.client.Register', () => Register);
    Navigation.registerComponent('com.client.ChatList', () => ChatList);
    Navigation.registerComponent('com.client.Contacts', () => Contacts);
    Navigation.registerComponent('com.client.ChatRoom', () => ChatRoom);
}