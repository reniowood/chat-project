import React from 'react';
import { View, Alert } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

export default class Splash extends React.Component {
    componentDidMount() {
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (fcmToken) => {
            const user = UserService.getLastUser();
            UserService.updateFCMToken(user.authToken);
        });

        const user = UserService.getLastUser();
        if (user) {
            const authToken = user.authToken;

            UserService.updateFCMToken(authToken).catch((error) => {
                Alert.alert('푸시 등록', error.message);
            });
            ChatService.getChatList(authToken).then((chatList) => {
                this.props.navigator.resetTo({
                    screen: 'com.client.ChatList',
                    title: 'ChatList',
                    passProps: {
                        chatList,
                        token: authToken
                    }
                });
            });
        } else {
            this.props.navigator.resetTo({
                screen: 'com.client.Login',
                title: 'Login',
            });
        }  
    }
    componentWillUnmount() {
        this.refreshTokenListener.remove();
    }
    render() {
        return (
            <View>
            </View>
        );
    }
}