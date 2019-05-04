import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, View, Text ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Container } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import RNPickerSelect from 'react-native-picker-select';
import FishAd from './comps/FishAd';
import TripAd1 from './comps/TripAd1'


@inject("store")
@observer
export default class CreateAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0

        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ width: responsiveWidth(100), backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                        
                    </Left>
                    <Body>
                        <Title>{this.props.store.strings.addAd}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>


                <Tabs

                    

                    tabBarUnderlineStyle={{ backgroundColor: '#ff9511' }}
                    onChangeTab={({ i }) => this.setState({ page: i })}

                //tabBarInactiveTextColor={{backgroundColor: "red"}}
                >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 0 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.trips}</Text></TabHeading>}
                    >
                        <TripAd1 />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 1 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.fishs}</Text></TabHeading>}>
                        <FishAd />
                    </Tab>

                </Tabs>

            </View>

        );
    }
}


