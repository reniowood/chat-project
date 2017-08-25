import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Color from '../styles/Color';
import ChatService from '../services/ChatService';
import ChatListItem from '../components/ChatListItem';

class ChatList extends React.Component {
    onPressChatListItem(item) {
        const { navigator } = this.props;

        navigator.push({
            screen: 'com.client.ChatRoom',
            title: item.name,
            passProps: {
                chatId: item.id,
            }
        });
    }

    onPressAddChatButton() {
        const { navigator } = this.props;

        this.props.navigator.push({
            screen: 'com.client.Contacts',
            title: 'Contacts',
        });
    }

    render() {
        const { chats } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={chats}
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

const mapStateToProps = (state, ownProps) => {
    return {
        chats: state.chats.order.map((id) => state.chats.data[id]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);