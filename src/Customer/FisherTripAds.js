import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CustomerTripCard from '../comps/CustomerTripCard';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";

@inject("store")
@observer
export default class FisherTripAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
        trips: null,
            loading: true,
            loadingMarins: true,
            marasi: null,
            loadingTypes: true,
            types: null,
            selectedMarasi: 1,
            selectedType: 1,
    };
  }

  componentDidMount() {
    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/trips_for_customer/customer_id='+this.props.store.userId+'&page=1', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {
               
                if (Response.data.data != "No record in trips") {
                    
                    this.setState({ trips: Response.data.data, loading: false })
                }
                else {
                    this.setState({ trips: null, loading: false })
                }


            })
            .catch(err => console.log(err));
}

  render() {
    return (
        <View style={{ flex: 1 }}>
        <FlatList
            contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}
            keyExtractor={(item, index) => index.toString()}
            //refreshing = {this.state.refreshing}
            // onRefresh = {this.refresh}
            //onEndReached= {()=>{this.loadMore()}}
            onEndReachedThreshold={0.01}
            onScrollEndDrag={() => { this.setState({ isListScrolled: true }); }}
            data={this.state.trips}
            //ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item, index }) => (<CustomerTripCard data={item} ind={index}

            >

            </CustomerTripCard>)}
        />
    </View>
    );
  }
}
