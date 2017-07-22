import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class UserListItem extends React.Component {
    render() {
        const item = this.props.item;

        return (
            <View>
                <TouchableHighlight onPress={this.props.onPressUserListItem}>
                    <View style={styles.item}>
                        <Text style={styles.subject}>{item.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        height: 60,
        borderBottomWidth: 1,
        paddingLeft: 15,
    },
    subject: {
        fontSize: 18,
    },
});