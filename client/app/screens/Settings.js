import React from 'react';
import { View, SectionList, StyleSheet } from 'react-native';
import Screen from './Screen';
import TwoLineListItem from '../components/TwoLineListItem';

class Settings extends Screen {
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
                                subtitle: '현재 로그인한 계정을 로그아웃합니다.'
                            }],
                            title: "계정",
                            renderItem: ({item}) => {
                                return (
                                    <TwoLineListItem
                                        title={item.title}
                                        subtitle={item.subtitle}
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

export default Settings;