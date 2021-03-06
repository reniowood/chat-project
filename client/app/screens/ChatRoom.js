import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ReversedFlatList from 'react-native-reversed-flat-list';
import FCM, { FCMEvent } from 'react-native-fcm';
import { addMessage } from '../actions/chats';
import Screen from './Screen';
import ChatService from '../services/ChatService';
import ChatBubble from '../components/ChatBubble';
import Color from '../styles/Color';

class ChatRoom extends Screen {
    // message = {key: 0, date: new Date('2017-06-01T10:00:00+09:00'), senderId: 1, msg: '안녕 뭐하구지내'}
    constructor(props) {
        super(props);

        this.initState(props);
        this.addFCMNotificationListener(props);
    }
    
    componentWillUnmount() {
        this.notificationListener.remove();
    }

    initState(props) {
        this.state = {
            msg: '',
        };
    }

    addFCMNotificationListener(props) {
        const { addMessage, chat } = props;
        
        this.notificationListener = FCM.on(FCMEvent.Notification, (notification) => {
            const message = this.createMessageFromPushNotification(notification);

            addMessage(chat.id, message.senderId, message.date, message.msg);
        });
    }

    createMessageFromPushNotification(notification) {
        const message = JSON.parse(notification.msg);

        return {
            senderId: message.senderId,
            date: new Date(message.date),
            msg: message.msg,
        };
    }

    sendMessage() {
        const { addMessage, user, chat } = this.props;

        ChatService.sendMessage(user.authToken, chat.id, this.state.msg).then((sentMessage) => {
            addMessage(chat.id, user.id, sentMessage.date, sentMessage.msg);
        });
    }

    send() {
        this.sendMessage();

        this._textInput.clear();
        this.setState({
            msg: '',
        })
    }

    render() {
        const { user, chat, messages } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.chatBubbleView}>
                    <ReversedFlatList
                        data={messages}
                        renderItem={({item}) => (
                            <ChatBubble
                                style={styles.chatBubble}
                                key={item.key}
                                sentByMe={user.id === item.senderId}
                                date={new Date(item.date)}
                            >
                                {item.message}
                            </ChatBubble>
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        ref={(view) => this._textInput = view}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            this.state.msg = text;
                        }}
                        onSubmitEditing={() => {
                            this.send();
                        }}
                        returnKeyType='send'
                    />
                    <View style={styles.sendButton}>
                        <Button
                            color={Color.peacockBlue}
                            onPress={() => {
                                this.send();
                            }}
                            title="전송"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatBubbleView: {
        flex: 1,
    },
    chatBubble: {
        margin: 10,
    },
    inputView: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 5,
        height: 48,
        backgroundColor: 'white',
    },
    textInput: {
        flex: 1,
    },
    sendButton: {
        justifyContent: 'center',
        width: 64,
        height: 48,
    },
});

const mapStateToProps = (state, ownProps) => {
    const chat = state.chats.chats.byId[ownProps.chatId];
    if (chat === undefined) {
        throw new Error(`채팅방이 존재하지 않습니다: ${ownProps.chatId}`);
    }
    const messages = chat.messages.map((messageId) => state.chats.messages.byId[messageId]);

    return {
        user: state.user,
        chat,
        messages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (chatId, senderId, date, message) => {
            dispatch(addMessage(chatId, senderId, date, message));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);