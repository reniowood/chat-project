import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icons from '../assets/icons';

export default class AvatarTextListItem extends React.Component {
    render() {
        const { title, onPress } = this.props;

        return (
            <View>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <Image source={Icons.avatar} style={styles.image} />
                        </View>
                        <View style={styles.text}>
                            <Text style={styles.title}>{title}</Text>
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
        height: 48,
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
});