import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import Color from '../styles/Color';
import UserService from '../services/UserService';

export default class Register extends React.Component {
    static navigationOptions = {
        title: 'Register',
    };

    constructor() {
        super();

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        };
    }

    onPressRegisterButton() {
        const { navigate } = this.props.navigation;

        UserService.register(this.state.email, this.state.name, this.state.password, this.state.confirmPassword)
        .then(() => {
            Alert.alert('등록', '등록 완료');
            Keyboard.dismiss();
            navigate('Login');
        })
        .catch((error) => {
            Alert.alert('등록', error.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => {
                        this.state.email = text;
                    }}
                    placeholder="email"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => {
                        this.state.name = text;
                    }}
                    placeholder="name"
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.state.password = text;
                    }}
                    placeholder="password"
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.state.confirmPassword = text;
                    }}
                    placeholder="confirm password"
                />
                <Button
                    onPress={this.onPressRegisterButton.bind(this)}
                    color={Color.peacockBlue}
                    title="Register"
                />
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