import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScreenNavigator } from './app/components/ScreenNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScreenNavigator style={styles.screenNavigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenNavigator: {
    width: Dimensions.get('window').width,
  },
});