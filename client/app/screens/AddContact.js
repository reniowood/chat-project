import React from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard } from 'react-native';
import Color from '../styles/Color';
import UserService from '../services/UserService';

export default class AddContact extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
        };
    }

    addContact() {
        UserService.addContact(this.props.token, this.state.email)
        .then(() => {
            Alert.alert('연락처 추가', '연락처 추가 완료');
            Keyboard.dismiss();
            this.props.navigator.pop({
                animated: false,
            });
        })
        .catch((error) => {
            Alert.alert('연락처 추가', error.message);
        });
    }

    onPressAddButton() {
        this.addContact();
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
                </View>
                <View>
                    <Button
                        onPress={this.onPressAddButton.bind(this)}
                        color={Color.peacockBlue}
                        title="Add"
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