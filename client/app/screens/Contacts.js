import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Color from '../styles/Color';
import UserListItem from '../components/UserListItem';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            contacts: [],
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    updateContacts() {
        UserService.getContacts(this.props.token)
        .then((contacts) => {
            this.setState({
                contacts: contacts.map((contact) => {
                    return Object.assign(contact, {
                        key: contact.id,
                    })
                }),
            })
        });
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'willAppear':
                this.updateContacts();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.updateContacts();
    }

    closeContacts() {
        this.props.navigator.pop({
            animated: false,
        });
    }

    openChatRoom() {
        this.props.navigator.push({
            screen: 'com.client.ChatRoom',
            passProps: {
                token: this.props.token,
                chatId,
                name: item.name
            },
        });
    }

    onPressUserListItem(item) {
        ChatService.createChat(this.props.token, item.id)
        .then((chatId) => {
            this.closeContacts();
            this.openChatRoom();
        });
    }

    onPressAddContactButton() {
        this.props.navigator.push({
            screen: 'com.client.AddContact',
            passProps: {
                token: this.props.token,
            },
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.contacts}
                    renderItem={({item}) => <UserListItem item={item} onPressUserListItem={this.onPressUserListItem.bind(this, item)} />}
                />
                <ActionButton
                    buttonColor={Color.candyApple}
                    position="right"
                    onPress={this.onPressAddContactButton.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});