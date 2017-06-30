import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Color from '../styles/Color';

export default class Register extends React.Component {
    static navigationOptions = {
        title: 'Register',
    };

    onPressRegisterButton() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="email"
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="password"
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
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