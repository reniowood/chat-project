import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';

class Settings extends Screen {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Settings;