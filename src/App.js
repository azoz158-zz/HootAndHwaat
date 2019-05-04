import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import MobxStore from './mobx/MobxStore';
import { Provider as MobXProvider, observer } from 'mobx-react/native';
import RouterComponent from './Routes';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#6fc1bb' }}>
                <MobXProvider store={MobxStore}>
                    <RouterComponent />
                </MobXProvider>
            </SafeAreaView>
        );
    }
}
