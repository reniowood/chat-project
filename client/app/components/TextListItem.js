import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

export default class TextListItem extends React.Component {
    render() {
        const { title, onPress } = this.props;

        return (
            <View>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        fontSize: 16,
    },
});