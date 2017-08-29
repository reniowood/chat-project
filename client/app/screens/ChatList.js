import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Screen from './Screen';
import Icons from '../assets/icons';
import Color from '../styles/Color';
import ChatService from '../services/ChatService';
import TwoLineListItem from '../components/TwoLineListItem';

class ChatList extends Screen {
    static navigatorButtons = {
        rightButtons: [
            {
                icon: Icons.settings,
                id: 'settings',
            },
        ],
    };

    constructor(props) {
        super(props);

        this.addNavigationEventListener(props);
    }

    addNavigationEventListener(props) {
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        const { navigator } = this.props;

        switch (event.type) {
            case 'NavBarButtonPress':
                switch (event.id) {
                    case 'settings':
                        navigator.push({
                            screen: 'com.client.Settings',
                            title: '설정',
                        });

                        break;
                    default:
                        break;
                }

                break;
            default:
                break;
        }
    }

    onPressListItem(item) {
        const { navigator } = this.props;

        navigator.push({
            screen: 'com.client.ChatRoom',
            title: item.name,
            passProps: {
                chatId: item.id,
            }
        });
    }

    onPressAddChatButton() {
        const { navigator } = this.props;

        this.props.navigator.push({
            screen: 'com.client.Contacts',
            title: 'Contacts',
        });
    }

    render() {
        const { chats } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                        data={chats}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                            <TwoLineListItem
                                title={item.name}
                                subtitle={item.lastMessage}
                                onPress={this.onPressListItem.bind(this, item)}
                            />
                        }
                    />
                </View>
                <ActionButton
                    buttonColor={Color.candyApple}
                    position="right"
                    onPress={this.onPressAddChatButton.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});

const setLastMessages = (chats, messages) => {
    chats.forEach((chat) => {
        if (chat.messages.length > 0) {
            const lastMessageId = chat.messages[chat.messages.length - 1];
            chat.lastMessage = messages[lastMessageId].message;
        }
    });
};

const mapStateToProps = (state, ownProps) => {
    const chats = state.chats.chats.allIds.map((id) => state.chats.chats.byId[id]);

    setLastMessages(chats, state.chats.messages.byId);

    return {
        chats,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);