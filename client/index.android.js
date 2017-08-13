import { Navigation } from 'react-native-navigation';
import { registerScreens } from './app/screens';

registerScreens();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'com.client.Splash',
        navigationStyle: {},
        navigationButton: {},
    },
    passProp: {},
});
