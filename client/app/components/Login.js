import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Color from '../styles/Color';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    logIn() {
        const userId = 1;

        return userId;
    }

    onPressLoginButton() {
        const { navigate } = this.props.navigation;

        const userId = this.logIn();

        navigate('ChatList', { userId });
    }

    onPressRegisterButton() {
        const { navigate } = this.props.navigation;

        navigate('Register');
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.textInput} placeholder="email" />
                    <TextInput style={styles.textInput} placeholder="password" />
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