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

        console.log(this.props);

        navigate('ChatRoom', { userId: params.userId, name: item.name });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[
                        {key: 1, name: 'chat 1', lastMsg: 'aaa'},
                        {key: 2, name: 'chat 2', lastMsg: 'bbbb'},
                        {key: 3, name: 'chat 3', lastMsg: 'ccccvbcv'},
                        {key: 4, name: 'chat 4', lastMsg: 'aaerterta'},
                        {key: 5, name: 'chat 5', lastMsg: 'ㅅㅈㄷㅅㅊㅌ퓿ㅍ'},
                        {key: 6, name: 'chat 6', lastMsg: 'ㅈㄷㅈㅁㄷㄹㅈㄷㄹ'},
                        {key: 7, name: 'chat 7', lastMsg: 'aa테스트트세트a'},
                        {key: 8, name: 'chat 8', lastMsg: 'wefwefgr'},
                    ]}
                    renderItem={({item}) => <ChatListItem item={item} onPressChatListItem={this.onPressChatListItem.bind(this, item)} />}
                />
            </View>
        );
    }
}