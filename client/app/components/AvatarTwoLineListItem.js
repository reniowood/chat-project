import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icons from '../assets/icons';

export default class AvatarTwoLineListItem extends React.Component {
    render() {
        const { title, subtitle, onPress }  = this.props;

        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <Image source={Icons.avatar} style={styles.image} />
                        </View>
                        <View style={styles.text}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{subtitle}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        height: 72,
    },
    icon: {
        paddingLeft: 16,
        justifyContent: 'center',
    },
    image: {
        width: 36,
        height: 36,
    },
    text: {
        paddingLeft: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    subtitle: {
        fontSize: 14,
    },
});