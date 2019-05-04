import React, { Component } from 'react';
import { StyleSheet, Picker, Image, ImageBackground, View, Text,Platform } from 'react-native';

import { Button } from 'native-base';


import { Actions } from 'react-native-router-flux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class SignUpSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ImageBackground source={require('../assets/imgs/5.png')} style={{ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center' }}>
            <Header style={{ backgroundColor: 'rgba(00,00,00,0)', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0,width:responsiveWidth(100) }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                        
                    </Left>
                    <Body>
                        
                    </Body>
                    <Right>
                      

                    </Right>
                </Header>
                <Image resizeMode='contain' style={{ width: "80%", height: '50%' }} source={require('../assets/imgs/logo.png')} />

                <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20 }}>
                    <Button transparent style={{ height: responsiveWidth(40), flexDirection: 'column' }} onPress={() => Actions.registerUser()}>
                        <View style={{ width: responsiveWidth(40), height: responsiveWidth(40), backgroundColor: 'white', borderRadius: responsiveWidth(5), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Image resizeMode='contain' style={{ height: responsiveHeight(20) }} source={require('../assets/imgs/client.png')} />
                        </View>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.user}</Text>
                    </Button>

                    <Button transparent style={{ height: responsiveWidth(40), flexDirection: 'column', }} onPress={() => Actions.registerFisher()}>
                        <View style={{ width: responsiveWidth(40), height: responsiveWidth(40), backgroundColor: 'white', borderRadius: responsiveWidth(5), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Image resizeMode='contain' style={{ height: responsiveHeight(20) }} source={require('../assets/imgs/fisher.png')} />
                        </View>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.s_provider}</Text>
                    </Button>
                </View>

            </ImageBackground>
        );
    }
}
