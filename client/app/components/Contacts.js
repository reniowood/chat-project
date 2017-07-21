import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UserService from '../services/UserService';

export default class Contacts extends React.Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    constructor() {
        super();
    
        this.state = {
            contacts: [],
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        UserService.getContacts(params.token, params.userId)
        .then((contacts) => {
            console.log('contacts: ' + contacts);
            this.setState({
                contacts: contacts.map((contact) => {
                    return Object.assign(contact, {
                        key: contact.id,
                    })
                }),
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.contacts}
                    renderItem={({item}) => <Text>{item.name}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});