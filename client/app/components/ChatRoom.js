import React from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import ChatBubble from './ChatBubble';
import Color from '../styles/Color';

export default class ChatRoom extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name,
    });

    render() {
        const { params } = this.props.navigation.state;

        return (
            <View style={styles.container}>
                <View style={styles.chatBubbleView}>
                    <ReversedFlatList ref={(view) => this._scrollView = view}
                        data={[
                            {key: 0, date: new Date('2017-06-01T10:00:00+09:00'), senderId: 1, msg: '안녕 뭐하구지내'},
                            {key: 1, date: new Date('2017-06-01T10:05:00+09:00'), senderId: 2, msg: '오랜만이다 그냥 회사다니지뭐'},
                            {key: 2, date: new Date('2017-06-01T10:10:11+09:00'), senderId: 1, msg: '회사는 다닐만 해?'},
                            {key: 3, date: new Date('2017-06-01T10:20:12+09:00'), senderId: 2, msg: '에이 뭐 그냥 그렇지'},
                            {key: 4, date: new Date('2017-06-01T11:00:47+09:00'), senderId: 1, msg: '다 비슷하게 사는구나'},
                            {key: 5, date: new Date('2017-06-01T11:01:01+09:00'), senderId: 1, msg: '지호 결혼 소식 들었어?'},
                            {key: 6, date: new Date('2017-06-01T11:32:29+09:00'), senderId: 2, msg: '엇 몰랐는데 언제?'},
                            {key: 7, date: new Date('2017-06-01T12:00:00+09:00'), senderId: 1, msg: '8월에 결혼한대'},
                            {key: 8, date: new Date('2017-06-01T12:45:17+09:00'), senderId: 2, msg: '오 너는 가려고?'},
                            {key: 9, date: new Date('2017-06-01T12:45:18+09:00'), senderId: 1, msg: '아니'},
                            {key: 10, date: new Date('2017-06-01T13:00:00+09:00'), senderId: 1, msg: 'ㅋㅋㅋㅋ'},
                            {key: 11, date: new Date('2017-06-01T13:05:18+09:00'), senderId: 2, msg: '왜 안갈라고?'},
                            {key: 12, date: new Date('2017-06-01T13:10:24+09:00'), senderId: 1, msg: '그냥'},
                        ]}
                        renderItem={({item}) => (
                            <ChatBubble
                                style={styles.chatBubble}
                                key={item.key}
                                sentByMe={params.userId === item.senderId}
                                date={item.date}
                            >
                                {item.msg}
                            </ChatBubble>)
                        }
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} />
                    <View style={styles.sendButton}>
                        <Button
                            color={Color.peacockBlue}
                            onPress={() => {}}
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