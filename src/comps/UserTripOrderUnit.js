import React, { Component } from 'react'
import { Image, Text, View,Platform } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Button } from 'native-base';
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class UserTripOrderUnit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.data.status
        };
    }

    rendBtn = () => {
        if (this.state.status == 0) {
            return (
                <Button style={{ width: '70%',  justifyContent: 'center', backgroundColor: '#f29521',alignSelf:'center' }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.pending}</Text>
                </Button>

            )
        }
        else if (this.state.status == 1) {
            return (
                <Button style={{ width: '70%',  justifyContent: 'center', backgroundColor: 'green',alignSelf:'center' }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.completed}</Text>
                </Button>
            )
        }
        else if (this.state.status == 2) {
            return (
                <Button style={{ width: '70%',  justifyContent: 'center', backgroundColor: 'red',alignSelf:'center' }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.deleted}</Text>
                </Button>
            )
        }
    }
    render() {
        return (
            <View style={{borderColor:'grey',borderWidth:1,paddingBottom:5,borderRadius:10,marginBottom:5}}>
                <View style={{ width: responsiveWidth(100), flexDirection: 'row', height: responsiveHeight(25), justifyContent: 'space-between', padding: 10 }}>
                <View style={{ width: "48%",justifyContent:'space-between' }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(3), width: '100%', textAlign: 'right' }}>{this.props.data.trip_type}</Text>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.cust_name}: {this.props.data.customer_username}</Text>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.phone2}:  {this.props.data.customer_mobile}</Text>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.data.trip_date}</Text>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.period} {this.props.data.trip_time} {this.props.store.strings.hours}</Text>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.price} {this.props.data.trip_price} {this.props.store.strings.riyal}</Text>
                    
                    
                </View>

                <Image resizeMode='stretch' style={{ width: '48%', height: '100%', borderRadius: 20 }} source={{ uri: this.props.data.trip_image }} />

</View>
{this.rendBtn()}

            </View>
        )
    }
}
