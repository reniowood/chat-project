import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default class Login extends React.Component {
    onPressLoginButton() {
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TextInput style={{width: 200, height: 50}} placeholder="email" />
                <TextInput style={{width: 200, height: 50}} placeholder="password" />
                <View style={{margin: 20}}>
                    <Button
                        onPress={this.onPressLoginButton}
                        title="Login"
                    />
                </View>
            </View>
        );
    }
}
