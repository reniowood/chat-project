import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import Color from '../styles/Color';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor() {
        super();

        const user = UserService.getLastUser();
        this.state = {
            email: user ? user.email : '',
            password: '',
        };
    }

    logIn() {
        UserService.getAuthToken(this.state.email, this.state.password)
        .then(({authToken}) => {
            UserService.saveAuthToken(this.state.email, authToken);
            UserService.updateFCMToken(authToken).catch((error) => {
                Alert.alert('푸시 등록', error.message);
            });
            ChatService.getChatList(authToken).then((chatList) => {
                Keyboard.dismiss();
                this.props.navigator.resetTo({
                    screen: 'com.client.ChatList',
                    passProps: {
                        chatList,
                        token: authToken
                    },
                });
            });
        })
        .catch((error) => {
            Alert.alert('로그인', error.message);
        });
    }

    onPressLoginButton() {
        this.logIn();
    }

    onPressRegisterButton() {
        this.props.navigator.push({
            screen: 'com.client.Register',
            passProps: {},
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => {
                            this.state.email = text;
                        }}
                        placeholder="email"
                        defaultValue={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.state.password = text;
                        }}
                        placeholder="password"
                    />
                </View>
                <View>
                    <Button
                        onPress={this.onPressLoginButton.bind(this)}
                        color={Color.peacockBlue}
                        title="Login"
                    />
                    <Button
                        onPress={this.onPressRegisterButton.bind(this)}
                        color={Color.peacockBlue}
                        title="Register"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 200,
        height: 50,
    },
});