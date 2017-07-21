import { StackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import ChatList from './ChatList';
import Contacts from './Contacts';
import ChatRoom from './ChatRoom';

export const ScreenNavigator = StackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    ChatList: { screen: ChatList },
    Contacts: { screen: Contacts },
    ChatRoom: { screen: ChatRoom },
});