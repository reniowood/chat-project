import { StackNavigator } from 'react-navigation';
import Login from './Login';
import ChatList from './ChatList';

export const ScreenNavigator = StackNavigator({
    Login: { screen: Login },
    ChatList: { screen: ChatList },
});