import React, { Component } from 'react'
import { Image, Text, View ,Platform} from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Button , Spinner} from 'native-base';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";


@inject("store")
export default class CustomerFishOrderUnit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.data.status,
            loadingAccept: false,
            loadingRefuse: false,
        };
    }
    accept = () => {
        this.setState({ loadingAccept: true })
        axios.post('http://hootandhawat-001-site1.ftempurl.com/api/fish/complete', {
            order_id: this.props.data.order_id
        }, {
                headers: {
                    AuthKey: this.props.store.authKey,
                }
            })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                this.setState({ loadingAccept:false})
                if (Response.data.code == 200) {

                    this.setState({status: 1 })
                }


            })
            .catch(err => console.log(err));
    }

    refuse = () => {
        this.setState({ loadingRefuse: true })
        axios.post('http://hootandhawat-001-site1.ftempurl.com/api/fish/refused', {
            order_id: this.props.data.order_id
        }, {
                headers: {
                    AuthKey: this.props.store.authKey,
                }
            })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {
                this.setState({ loadingRefuse:false})
                
                if (Response.data.code == 200) {

                    this.setState({ status: 2 })
                }


            })
            .catch(err => console.log(err));
    }

    renderAccept = () => {
        if (this.state.loadingAccept == false) {
            return (<Button style={{ width: '45%', height: '100%', justifyContent: 'center', backgroundColor: 'green' }} onPress={() => { this.accept() }}>
                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.accept}</Text>
            </Button>)
        }
        else {
            return (<View style={{ width: 150, height: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Spinner />
            </View>)
        }
    }

    renderRefuse = () => {
        if (this.state.loadingRefuse == false) {
            return (<Button style={{ width: '45%', height: '100%', justifyContent: 'center', backgroundColor: 'red' }} onPress={() => { this.refuse() }}>
                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.decline}</Text>
            </Button>)
        }
        else {
            return (<View style={{ width: 150, height: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Spinner />
            </View>)

        }
    }
    rendBtn = () => {
        if (this.state.status == 0) {
            return (
                <View style={{ flexDirection: 'row', width: "80%", justifyContent: 'space-between',alignSelf:'center' }}>
                    {this.renderAccept()}
                    {this.renderRefuse()}
                </View>

            )
        }
        else if (this.state.status == 1) {
            return (
                <Button style={{ width: '70%',  justifyContent: 'center', backgroundColor: '#4a4a48',alignSelf:'center' }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'white' }}>{this.props.store.strings.accepted}</Text>
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


                    <View style={{ width: "48%", justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(3), width: '100%', textAlign: 'right' }}>{this.props.data.type}</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.weight}: {this.props.data.fish_weight} {this.props.store.strings.kg}</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.c_name}:  {this.props.data.username}</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.phone2}:  {this.props.data.user_mobile}</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'right' }}>{this.props.store.strings.price}: {this.props.data.fish_price} {this.props.store.strings.riyal}</Text>
                        <View style={{ flexDirection: 'row', height: '20%', width: "100%", justifyContent: 'space-between' }}>

                            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '50%', textAlign: 'right' }}>
                                {this.props.store.strings.delivery}
                    </Text>

                            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '50%', textAlign: 'right' }}>
                                {this.props.store.strings.cook}
                    </Text>

                        </View>



                    </View>

                    <Image resizeMode='stretch' style={{ width: '48%', height: '100%', borderRadius: 20 }} source={{ uri: this.props.data.fish_image }} />


                </View>

                {this.rendBtn()}
            </View>
        )
    }
}
