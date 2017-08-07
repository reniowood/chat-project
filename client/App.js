import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
import { ScreenNavigator } from './app/components/ScreenNavigator';

export default class App extends React.Component {
  componentDidMount() {
    this.notificationListener = FCM.on(FCMEvent.Notification, (notification) => {
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (fcmToken) => {
      const user = UserService.getLastUser();
      UserService.updateFCMToken(user.authToken);
    });
  }
  componentWillUnmount() {
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }
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