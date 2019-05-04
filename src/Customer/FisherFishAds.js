import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TripCard from '../comps/TripCard';
import axios from 'react-native-axios';
import CustomerFishCard from '../comps/CustomerFishCard'
import { observer, inject, computed } from "mobx-react";



@inject("store")
@observer
export default class FisherFishAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishes: null,
            fishTypes: []
        };
    }

    componentDidMount() {
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/fishes/all/customer_id=' + this.props.store.userId + '&page=1', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {
                
                if (Response.data.data != "No record in fishes") {
                    
                    this.setState({ fishes: Response.data.data, loading: false })

                }
                else {
                    this.setState({ fishes: null, loading: false })
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
                    data={this.state.fishes}
                    //ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item, index }) => (<CustomerFishCard data={item} ind={index}

                    >

                    </CustomerFishCard>)}
                />
            </View>
        );
    }
}
