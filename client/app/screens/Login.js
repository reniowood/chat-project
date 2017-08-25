import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions/user';
import { addContact } from '../actions/contacts';
import { addChat, addMessage } from '../actions/chats';
import Color from '../styles/Color';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
        };
    }

    componentWillMount() {
        const { user } = this.props;
        
        this.setState({
            email: user.email,
        });
    }

    updateState(authToken) {
        const { addContact, addChat, addMessage } = this.props;

        return new Promise((resolve, reject) => {
            UserService.getContacts(authToken).then((contacts) => {
                contacts.map((contact) => addContact(contact.id, contact.name));
    
                ChatService.getChatList(authToken).then((chats) => {
                    chats.map(({id, name, user_ids, messages}) => {
                        addChat(id, name, user_ids);
                        
                        messages.map(({id, sender_id, msg}) => {
                            addMessage(id, sender_id, msg.date, msg.msg);
                        });
                    });

                    resolve();
                });
            });
        });
    }

    logIn() {
        const { navigator, loginUser } = this.props;
        const { email, password } = this.state;

        UserService.getAuthToken(email, password).then(({authToken}) => {
            loginUser(email, authToken);

            UserService.updateFCMToken(authToken).catch((error) => {
                Alert.alert('푸시 등록', error.message);
            });

            this.updateState(authToken).then(() => {
                Keyboard.dismiss();
                navigator.resetTo({
                    screen: 'com.client.ChatList',
                });
            });
        }).catch((error) => {
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

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (email, authToken) => {
            dispatch(loginUser(email, authToken));
        },
        addContact: (id, name) => {
            dispatch(addContact(id, name));
        },
        addChat: (id, name, userIds) => {
            dispatch(addChat(id, name, userIds));
        },
        addMessage: (chatId, senderId, date, message) => {
            dispatch(addMessage(chatId, senderId, date, message));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);