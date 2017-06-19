import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../styles/Color';

export default class ChatBubble extends React.Component {
    convertDateFormat(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오전' : '오후';

        return `${ampm} ${hours % 12}:${minutes}`;
    }

    render() {
        return (
            <View style={[styles.container, this.props.sentByMe && styles.viewSentByMe]}>
                <View style={[styles.bubble, this.props.sentByMe && styles.myBubble, !this.props.sentByMe && styles.friendBubble]}>
                    <Text style={[styles.msg, this.props.sentByMe && styles.myMsg, !this.props.sentByMe && styles.friendMsg]}>
                        {this.props.children}
                    </Text>
                    <Text style={[styles.date, this.props.sentByMe && styles.myDate, !this.props.sentByMe && styles.friendDate]}>
                        {this.convertDateFormat(this.props.date)}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bubble: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    myBubble: {
        backgroundColor: Color.peacockBlue,
        borderWidth: 1,
        borderColor: Color.peacockBlue,
        borderRadius: 10,
    },
    friendBubble: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.peacockBlue,
        borderRadius: 10,
    },
    myMsg: {
        textAlign: 'right',
        color: 'white',
        fontSize: 20,
    },
    friendMsg: {
        color: Color.peacockBlue,
        fontSize: 20,
    },
    myDate: {
        textAlign: 'right',
        color: 'white',
    },
    friendDate: {
        color: Color.peacockBlue,
    },
    viewSentByMe: {
        justifyContent: 'flex-end',
    },
});