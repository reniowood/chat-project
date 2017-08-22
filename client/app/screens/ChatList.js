import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Color from '../styles/Color';
import ChatService from '../services/ChatService';
import ChatListItem from '../components/ChatListItem';

export default class ChatList extends React.Component {
    onPressChatListItem(item) {
        this.props.navigator.push({
            screen: 'com.client.ChatRoom',
            title: item.name,
            passProps: {
                token: this.props.token,
                chatId: item.id,
            },
        });
    }

    onPressAddChatButton() {
        this.props.navigator.push({
            screen: 'com.client.Contacts',
            title: 'Contacts',
            passProps: {
                token: this.props.token
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.chatList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ChatListItem item={item} onPressChatListItem={this.onPressChatListItem.bind(this, item)} />}
                />
                <ActionButton
                    buttonColor={Color.candyApple}
                    position="right"
                    onPress={this.onPressAddChatButton.bind(this)}
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