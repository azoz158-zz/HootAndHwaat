import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, View, Text ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Container } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import RNPickerSelect from 'react-native-picker-select';
import CustomerFishOrderUnit from './comps/CustomerFishOrderUnit'
import { observer, inject, computed } from "mobx-react";


@inject("store")
export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            orders:null,
        };
    }

    componentDidMount(){
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/orders/all/trips/user_id='+ this.props.store.userId+'&page=1', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

              
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
                <Header style={{ width: responsiveWidth(100), backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>

                    </Left>
                    <Body>
                        <Title>{this.props.store.strings.orders}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>


                <Tabs

                    initialPage={this.state.page}

                    tabBarUnderlineStyle={{ backgroundColor: '#ff9511' }}
                    onChangeTab={({ i }) => this.setState({ page: i })}

                //tabBarInactiveTextColor={{backgroundColor: "red"}}
                >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 0 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>الطلبات الحالية</Text></TabHeading>}
                    >
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
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#004a71' }}><Text style={{ fontSize: responsiveFontSize(2.5), color: this.state.page == 1 ? 'white' : '#79accb', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>الطلبات السابقة</Text></TabHeading>}>

                    </Tab>

                </Tabs>

            </View>
        );
    }
}
