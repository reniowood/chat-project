import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Color from '../styles/Color';
import ChatListItem from './ChatListItem';

export default class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chats',
    };

    onPressChatListItem(item) {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        navigate('ChatRoom', {
            token: params.token,
            userId: params.userId,
            chatId: item.id,
            name: item.name
        });
    }

    onPressAddChatButton() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        navigate('Contacts', {
            token: params.token,
            userId: params.userId,
            token: params.token
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        
        return (
            <View style={styles.container}>
                <FlatList
                    data={params.chatList}
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