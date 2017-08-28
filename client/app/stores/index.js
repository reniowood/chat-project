import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ChatProject from '../reducers/index';

export const store = createStore(
    ChatProject,
    undefined,
    compose(
        autoRehydrate()
    )
);

export const persistor = persistStore(store, { storage: AsyncStorage });