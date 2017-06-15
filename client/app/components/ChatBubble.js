import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ChatBubble extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.sentByMe && styles.viewSentByMe]}>
                <View style={styles.bubble}>
                    <Text style={[styles.msg, this.props.sentByMe && styles.txtSentByMe]}>
                        {this.props.children}
                    </Text>
                    <Text style={[styles.date, this.props.sentByMe && styles.txtSentByMe]}>
                        {this.props.date.toString()}
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
        width: 200,
        minHeight: 50,
        borderWidth: 1,
        borderColor: 'black',
    },
    msg: {
    },
    date: {
    },
    viewSentByMe: {
        justifyContent: 'flex-end',
    },
    txtSentByMe: {
        textAlign: 'right',
    },
});