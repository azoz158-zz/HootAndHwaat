import React, { Component } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CustomerFishOrderUnit from '../comps/CustomerFishOrderUnit'
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class FisherOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      orders: null,
    };
  }

  componentDidMount() {
    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/orders/all/fishes/customer_id=' + this.props.store.userId + '&page=1', {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        console.log(Response.data)
        if (Response.data.data != "No records") {

          this.setState({ orders: Response.data.data, loading: false })
        }
        else {

          this.setState({ orders: null, loading: false })
        }

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>

          </Left>
          <Body>
            <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.fish_orders}</Title>
          </Body>
          <Right>

            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: 'white' }} />
            </Button>

          </Right>
        </Header>

        <FlatList
          contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}
          keyExtractor={(item, index) => index.toString()}
          //refreshing = {this.state.refreshing}
          // onRefresh = {this.refresh}
          //onEndReached= {()=>{this.loadMore()}}
          onEndReachedThreshold={0.01}
          onScrollEndDrag={() => { this.setState({ isListScrolled: true }); }}
          data={this.state.orders}
          //ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item, index }) => (<CustomerFishOrderUnit data={item} ind={index}

          >

          </CustomerFishOrderUnit>)}
        />


      </View>
    )
  }
}
