import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class TwoLineListItem extends React.Component {
    render() {
        const { title, subtitle }  = this.props;

        return (
            <View>
                <TouchableHighlight onPress={this.props.onPressListItem}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
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
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
    },
});