import React from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import ChatService from '../services/ChatService';
import ChatBubble from './ChatBubble';
import Color from '../styles/Color';

export default class ChatRoom extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name,
    });

    // state.data[0] = {key: 0, date: new Date('2017-06-01T10:00:00+09:00'), senderId: 1, msg: '안녕 뭐하구지내'}
    constructor() {
        super(); 
        
        this.state = {
            data: [],
        };
        this.lastKey = -1;
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        ChatService.getChat(params.token, params.chatId)
        .then((data) => {
            console.log(data);
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

    sendMessage() {
        const { params } = this.props.navigation.state;

        ChatService.sendMessage(params.token, params.chatId, this.state.msg)
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
        const { params } = this.props.navigation.state;

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