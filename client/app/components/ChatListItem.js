import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class ChatListItem extends React.Component {
    onPressChatListItem() {
        const { navigate } = this.props.navigation;

        navigate('ChatRoom');
    }

    render() {
        const item = this.props.item;

        return (
            <View>
                <TouchableHighlight onPress={this.onPressChatListItem.bind(this)}>
                    <View style={styles.item}>
                        <Text style={styles.subject}>{item.name}</Text>
                        <Text>{item.lastMsg}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 80,
        borderBottomWidth: 1,
        paddingLeft: 15,
        paddingTop: 15,
    },
    subject: {
        fontWeight: 'bold',
    },
});