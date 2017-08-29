import React from 'react';
import { View, SectionList, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Screen from './Screen';
import { initUser } from '../actions/user';
import { initChats } from '../actions/chats';
import { initContacts } from '../actions/contacts';
import TwoLineListItem from '../components/TwoLineListItem';

class Settings extends Screen {
    logOut() {
        const { navigator, initUser, initChats, initContacts } = this.props;

        initUser();
        initChats();
        initContacts();

        navigator.resetTo({
            screen: 'com.client.Login',
        });
    }

    onPressLogoutListItem() {
        Alert.alert(
            '로그아웃',
            '정말 로그아웃 하시겠습니까?',
            [
                { text: '아니오' },
                { text: '예', onPress: this.logOut.bind(this) }
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        {
                            data: [{
                                key: 1,
                                title: '계정 정보',
                                subtitle: '계정 정보를 확인합니다.'
                            }, {
                                key: 2,
                                title: '로그아웃',
                                subtitle: '현재 로그인한 계정을 로그아웃합니다.',
                                onPress: this.onPressLogoutListItem.bind(this),
                            }],
                            title: "계정",
                            renderItem: ({item}) => {
                                return (
                                    <TwoLineListItem
                                        title={item.title}
                                        subtitle={item.subtitle}
                                        onPress={item.onPress}
                                    />
                                );
                            }
                        }
                    ]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initUser: () => {
            dispatch(initUser());
        },
        initChats: () => {
            dispatch(initChats());
        },
        initContacts: () => {
            dispatch(initContacts());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);