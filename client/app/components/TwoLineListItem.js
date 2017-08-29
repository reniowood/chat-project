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
        height: 80,
        borderBottomWidth: 1,
        paddingLeft: 15,
        paddingTop: 15,
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
    },
});