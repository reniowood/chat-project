import { StackNavigator } from 'react-navigation';
import Login from './Login';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

export const ScreenNavigator = StackNavigator({
    Login: { screen: Login },
    ChatList: { screen: ChatList },
    ChatRoom: { screen: ChatRoom },
});