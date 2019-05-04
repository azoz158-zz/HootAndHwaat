import React, { Component } from 'react';
import { FlatList, Image, View, Text ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CustomerTripOrderUnit from '../comps/CustomerTripOrderUnit'
import axios from 'react-native-axios';
import FisherFishAds from './FisherFishAds';
import FisherTripAds from './FisherTripAds'
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class FisherAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
        page: 0,
        orders:null,
    };
}

  render() {
    return (
      <View style={{flex:1}}>
        <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>
            <Button transparent onPress={() =>{Actions.createAd()}}>
              <Icon name='add' style={{ color: 'white' }} />
            </Button>
            
          </Left>
          <Body>
            <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.my_ads}</Title>
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
        >
          <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 0 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.fishs}</Text></TabHeading>}>
          <FisherFishAds/>
          </Tab>

          <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 1 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.trips}</Text></TabHeading>}>
          <FisherTripAds/>
          </Tab>
        
        </Tabs>

        
      </View>
    )
  }
}
