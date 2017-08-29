import { Navigation } from 'react-native-navigation';

import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import ChatList from './ChatList';
import Contacts from './Contacts';
import AddContact from './AddContact';
import ChatRoom from './ChatRoom';
import Settings from './Settings';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('com.client.Splash', () => Splash, store, Provider);
    Navigation.registerComponent('com.client.Login', () => Login, store, Provider);
    Navigation.registerComponent('com.client.Register', () => Register, store, Provider);
    Navigation.registerComponent('com.client.ChatList', () => ChatList, store, Provider);
    Navigation.registerComponent('com.client.Contacts', () => Contacts, store, Provider);
    Navigation.registerComponent('com.client.AddContact', () => AddContact, store, Provider);
    Navigation.registerComponent('com.client.ChatRoom', () => ChatRoom, store, Provider);
    Navigation.registerComponent('com.client.Settings', () => Settings, store, Provider);
}