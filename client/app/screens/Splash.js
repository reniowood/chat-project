import React from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import FCM, { FCMEvent } from 'react-native-fcm';
import { persistor } from '../stores/index';
import Screen from './Screen';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

class Splash extends Screen {
    static navigatorStyle = {
        ...Screen.navigatorStyle,
        navBarHidden: true,
    };
    
    constructor(props) {
        super(props);

        this.addFCMRefreshTokenListener(props);
        this.addFCMNotificationListener(props);
        this.autoLogin(props);
    }

    addFCMRefreshTokenListener(props) {
        const { user } = props;

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (fcmToken) => {
            if (user && user.authToken !== null) {
                UserService.updateFCMToken(user.authToken);
            }
        });
    }

    addFCMNotificationListener(props) {
        const { navigator, user } = props;

        this.notificationListener = FCM.on(FCMEvent.Notification, (notification) => {
            if (notification.opened_from_tray) {
                if (notification.id) {
                    const chatId = parseInt(notification.id);
            
                    if (user) {
                        navigator.push({
                            screen: 'com.client.ChatRoom',
                            title: notification.chat_name,
                            passProps: {
                                chatId,
                            }
                        });
                    } else {
                        navigator.resetTo({
                            screen: 'com.client.Login',
                        });
                    }
                }
            }
        });
    }
        
    autoLogin(props) {
        const { navigator, user } = props;

        if (user && user.authToken !== null) {
            UserService.updateFCMToken(user.authToken).then(() => {
                navigator.resetTo({
                    screen: 'com.client.ChatList',
                    title: 'ChatList',
                });
            }).catch((error) => {
                Alert.alert('푸시 등록', error.message);
            });
        } else {
            navigator.resetTo({
                screen: 'com.client.Login',
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

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);