import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { addChat } from '../actions/chats';
import Color from '../styles/Color';
import UserListItem from '../components/UserListItem';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';

class Contacts extends React.Component {
    closeContacts() {
        const { navigator } = this.props;

        navigator.pop({
            animated: false,
        });
    }

    openChatRoom(chatId, name) {
        const { navigator } = this.props;

        navigator.push({
            screen: 'com.client.ChatRoom',
            title: name,
        });
    }

    onPressUserListItem(item) {
        const { token, addChat } = this.props;

        ChatService.createChat(token, [item.id]).then(({chatId, name}) => {
            addChat(chatId, name, [user.id, item.id], []);

            this.closeContacts();
            this.openChatRoom(chatId, name);
        });
    }

    onPressAddContactButton() {
        const { navigator } = this.props;

        navigator.push({
            screen: 'com.client.AddContact',
        })
    }

    render() {
        const { contacts } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={contacts}
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

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        contacts: state.contacts.allIds.map((id) => state.contacts.byId[id]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (id, name, userIds, messages) => {
            dispatch(addChat(id, name, userIds, messages));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);