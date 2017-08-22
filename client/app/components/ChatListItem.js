import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class ChatListItem extends React.Component {
    render() {
        const item = this.props.item;
        console.log(item.last_message);

        return (
            <View>
                <TouchableHighlight onPress={this.props.onPressChatListItem}>
                    <View style={styles.item}>
                        <Text style={styles.subject}>{item.name}</Text>
                        <Text>{item.last_message}</Text>
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