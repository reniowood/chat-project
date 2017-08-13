import React from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import FCM, { FCMEvent } from 'react-native-fcm';
import ChatService from '../services/ChatService';
import ChatBubble from '../components/ChatBubble';
import Color from '../styles/Color';

export default class ChatRoom extends React.Component {
    // state.data[0] = {key: 0, date: new Date('2017-06-01T10:00:00+09:00'), senderId: 1, msg: '안녕 뭐하구지내'}
    constructor() {
        super(); 
        
        this.state = {
            data: [],
        };
        this.lastKey = -1;
    }

    createMessageFromPushNotification(notification) {
        this.lastKey += 1;

        const message = JSON.parse(notification.msg);
        console.log(JSON.stringify(message));

        return {
            key: this.lastKey,
            sentByMe: false,
            date: new Date(message.date),
            msg: message.msg,
        };
    }

    componentDidMount() {
        this.notificationListener = FCM.on(FCMEvent.Notification, (notification) => {
            console.log('notification: ' + JSON.stringify(notification));

            this.setState({
                data: [
                    ...this.state.data,
                    this.createMessageFromPushNotification(notification),
                ],
            })
        });
        ChatService.getChat(this.props.token, this.props.chatId)
        .then((data) => {
            data.messages.reverse();
            
            this.setState({
                data: data.messages.map((message) => {
                    this.lastKey += 1;
                    return Object.assign(message.msg, {
                        key: this.lastKey
                    });
                }),
            });
        });
    }

    componentWillUnmount() {
        this.notificationListener.remove();
    }

    sendMessage() {
        ChatService.sendMessage(this.props.token, this.props.chatId, this.state.msg)
        .then((sentMessage) => {
            this.lastKey += 1;
            this.setState({
                data: [
                    ...this.state.data,
                    Object.assign(sentMessage, {
                        key: this.lastKey,
                        sent_by_me: true,
                    }),
                ],
            });
        });
    }

    send() {
        this.sendMessage();
        this._textInput.clear();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.chatBubbleView}>
                    <ReversedFlatList ref={(view) => this._scrollView = view}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ChatBubble
                                style={styles.chatBubble}
                                key={item.key}
                                sentByMe={item.sent_by_me}
                                date={new Date(item.date)}
                            >
                                {item.msg}
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