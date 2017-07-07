import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ChatListItem from './ChatListItem';

export default class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chats',
    };

    onPressChatListItem(item) {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        navigate('ChatRoom', { userId: params.userId, name: item.name });
    }

    render() {
        const { params } = this.props.navigation.state;
        
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={params.chatList}
                    renderItem={({item}) => <ChatListItem item={item} onPressChatListItem={this.onPressChatListItem.bind(this, item)} />}
                />
            </View>
        );
    }
}