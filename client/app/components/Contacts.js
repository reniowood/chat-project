import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UserListItem from '../components/UserListItem';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

export default class Contacts extends React.Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    constructor() {
        super();
    
        this.state = {
            contacts: [],
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        UserService.getContacts(params.token, params.userId)
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
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        console.log('params');
        console.log(params);

        ChatService.createChat(params.token, item.id)
        .then((chatId) => {
            console.log('chatId: ' + chatId);
            navigate('ChatRoom', {
                token: params.token,
                userId: params.userId,
                chatId,
                name: item.name
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