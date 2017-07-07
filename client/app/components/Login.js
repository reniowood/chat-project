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

        this.state = {
            email: '',
            password: '',
        };
    }

    logIn() {
        const { navigate } = this.props.navigation;

        UserService.getAuthToken(this.state.email, this.state.password)
        .then((token) => {
            ChatService.getChatList(token).then((chatList) => {
                Keyboard.dismiss();
                navigate('ChatList', { chatList });
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
        const { navigate } = this.props.navigation;

        navigate('Register');
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