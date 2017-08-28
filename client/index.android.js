import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './app/screens';
import { store } from './app/stores/index';

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'com.client.Splash',
        navigationStyle: {},
        navigationButton: {},
    },
    passProp: {},
});
