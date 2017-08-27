import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { registerUser } from '../actions/user';
import Color from '../styles/Color';
import UserService from '../services/UserService';

class Register extends React.Component {
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
        const { navigator } = this.props;
        const { email, name, password, confirmPassword } = this.state;

        UserService.register(email, name, password, confirmPassword).then(({id}) => {
            registerUser(id, email);

            Alert.alert('등록', '등록 완료');
            Keyboard.dismiss();
            navigator.pop({
                animated: false,
            });
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

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (id, email) => {
            dispatch(registerUser(id, email));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);