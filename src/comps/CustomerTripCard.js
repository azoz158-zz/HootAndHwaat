import React, { Component } from 'react';
import { TouchableHighlight, Image, ImageBackground, View, Text,Platform } from 'react-native';
import { Card, Icon, Right, Left, Button, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject, computed } from "mobx-react";
import axios from 'react-native-axios';
import Dialog from "react-native-dialog";
import { Actions } from 'react-native-router-flux'

@inject("store")
@observer
export default class CustomerTripCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            loadingDetails: true,
            details: null,
            services: null,
            btnTxt: this.props.store.strings.book,
            numberVisible: false,
            tempTickets: null,
            tickets: null,
            buying: false,
            bought: false,
            deleting: false,
            deleted: false,
        };
    }

    renderTickets = () => {

        return (
            <Dialog.Container visible={this.state.numberVisible}>
                <Dialog.Title>{this.props.store.strings.no_of_tikets}</Dialog.Title>
                <Dialog.Input placeholder='0' keyboardType='numeric' onChangeText={(txt) => this.setState({ tempTickets: txt })} />
                <Dialog.Button label="Cancel" onPress={() => this.setState({ numberVisible: false })} />
                <Dialog.Button label="Ok" onPress={() => { this.setState({ numberVisible: false, tickets: this.state.tempTickets }); this.handleBuy() }} />
            </Dialog.Container>
        )

    }


    loadDetails = () => {
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/trips/' + this.props.data.trip_id, {})
            .then(Response => {
                
                
                this.setState({ loadingDetails: false, details: Response.data.data, services: Response.data.services })

            })
            .catch(err => console.log(err));
    }

    handleBuy = () => {

        this.setState({ buying: true })

        axios.post('http://hootandhawat-001-site1.ftempurl.com/api/add/trip_order', {
            user_id: this.props.store.userId, trip_id: this.props.data.trip_id, number_of_tickets: this.state.tickets
        }, {
                headers: {
                    Authentication: this.props.store.authKey,
                }
            })
            .then(Response => {
                
                this.setState({ buying: false })
                if (Response.data.code == 1) {

                    this.setState({ buying: false, bought: true, btnTxt: this.props.store.strings.pending})
                }
                else if (Response.data.code == 2) {
                    //this.setState({ buying: false, bought: true, btnTxt: 'مطلوب سابقا' })
                }


            })
            .catch(err => console.log(err));

    }

    showTickets = () => {

        if (this.props.store.loggedIn == true) {
            this.setState({ numberVisible: true })
        }
        else {
            Actions.signIn()
        }

    }

    delete = () => {
        this.setState({ deleting: true })
        axios.delete('http://hootandhawat-001-site1.ftempurl.com/api/remove/trip/trip_id=' + this.props.data.trip_id + '&customer_id=' + this.props.store.userId,{})
            .then(Response => {
                
                if (Response.data.code == 200) {
                    
                    this.setState({ deleting: false, deleted: true })
                }


            })
            .catch(err => console.log(err));

    }

    renderBtn = () => {
        if (this.props.store.userType == 'customer') {
            if (this.state.deleting == false) {
                return (<Button block style={{ width: 150, height: 40, alignItems: 'center', alignContent: 'center', backgroundColor: 'red', justifyContent: 'center' }} onPress={() => this.delete()}>
                    <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.delete}</Text>
                </Button>)
            }
            else {
                return (<View style={{ width: 150, height: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <Spinner />

                </View>)
            }
        }
        else {
            return null
        }

    }


    renderDetails = () => {

        let sevs = ""
        if (this.state.services != null) {
            sevs = this.state.services.toString()
            
        }
        if (this.props.store.selectedTrip == this.props.data.trip_id) {
            if (this.state.loadingDetails == false) {
                return (
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
                        <Left>
                            {this.renderBtn()}
                        </Left>
                        <Right>
                            <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.3) }}>{this.props.data.trip_type}</Text>
                            <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.3) }}>{this.props.store.strings.no_persons} {this.props.data.passengers}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.3) }}> {this.props.store.strings.services}:{sevs}</Text>
                            </View>

                        </Right>
                    </View>
                )
            }
            else {
                return (<View style={{ width: "100%", height: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <Spinner />

                </View>)
            }


        }
        else {
            return null
        }



    }
    renCont = () => {
        if (this.state.deleted == false) {
            return (
                <View style={{width:'100%'}}>

                    <Button transparent style={{ width: '100%', height: 200, borderRadius: 10, flexDirection: 'column' }} onPress={() => { this.props.store.setSlectedTrip(this.props.data.trip_id); this.loadDetails() }}>

                        <Image style={{ position: 'absolute', width: responsiveWidth(98), height: '100%', borderRadius: 10 }} source={{ uri: this.props.data.trip_image }} />
                        <View style={{ width: '100%', justifyContent: 'space-between', height: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', marginRight: 10, fontSize: responsiveFontSize(2.3) }}>{this.props.data.trip_time}</Text>
                                <Icon name='clock' style={{ color: 'white' }} />
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'rgba(000,000,000,.5)', padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>

                                <Left>
                                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                        <Icon name="cash" style={{ color: '#f29521', width: 40, alignSelf: 'center', }} />
                                        <Text style={{ width: '100%', color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.data.trip_price} {this.props.store.strings.riyal}</Text>
                                    </View>


                                </Left>
                                <Right>
                                    <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.3) }}>{this.props.data.trip_boatName}</Text>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', marginRight: 10, fontSize: responsiveFontSize(2.3) }}>{this.props.data.trip_date}</Text>
                                        <Icon style={{ color: '#f29521' }} name='calendar' />
                                    </View>
                                </Right>
                            </View>
                        </View>

                    </Button>




                    {this.renderDetails()}
                    {this.renderTickets()}
                </View>
            )
        }
        else
        {
            return null
        }
    }
    render() {
        return (
            <View style={{ width: '98%', paddingBottom: 0, alignContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', marginBottom: 10 }}>
{this.renCont()}

            </View>
        );
    }
}
