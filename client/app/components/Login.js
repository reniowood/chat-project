import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class Login extends React.Component {
    static navigationOptions ={
        title: 'Login',
    };

    onPressLoginButton() {
        const { navigate } = this.props.navigation;

        navigate('ChatList');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="email" />
                <TextInput style={styles.textInput} placeholder="password" />
                <Button
                    onPress={this.onPressLoginButton.bind(this)}
                    title="Login"
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