import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UserListItem from '../components/UserListItem';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

export default class Contacts extends React.Component {
    constructor() {
        super();
    
        this.state = {
            contacts: [],
        }
    }

    componentDidMount() {
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

    onPressUserListItem(item) {
        ChatService.createChat(this.props.token, item.id)
        .then((chatId) => {
            this.props.navigator.pop();
            this.props.navigator.push({
                screen: 'com.client.ChatRoom',
                passProps: {
                    token: this.props.token,
                    chatId,
                    name: item.name
                },
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.contacts}
                    renderItem={({item}) => <UserListItem item={item} onPressUserListItem={this.onPressUserListItem.bind(this, item)} />}
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