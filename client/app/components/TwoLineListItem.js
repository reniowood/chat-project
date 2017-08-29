import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

export default class TwoLineListItem extends React.Component {
    render() {
        const { title, subtitle, onPress }  = this.props;

        return (
            <View>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 72,
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 14,
    },
});