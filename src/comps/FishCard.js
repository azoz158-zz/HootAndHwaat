import React, { Component } from 'react';
import { Image, ImageBackground, View, Text ,Platform} from 'react-native';
import { Card, Icon, Right, Left, Button, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject, computed } from "mobx-react";
import { Actions } from 'react-native-router-flux';
import axios from 'react-native-axios';
import Toast, { DURATION } from 'react-native-easy-toast'

@inject("store")
@observer
export default class FishCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buying: false,
            bought: false,
            btnTxt: this.props.store.strings.buy

        };
    }

    handleBuy = () => {

        var serializeJSON = function(data) {
            return Object.keys(data).map(function (keyName) {
              return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
            }).join('&');
          }


        if (this.props.store.loggedIn == true) {
            let formData = new FormData();
            let token = '6299b1f4ceacc939635e615cda3d781c2955b9ff1538076288'
            formData.append('user_id', this.props.store.userId)
            formData.append('fish_id', this.props.data.f_id)
            this.setState({ buying: true })




            /*fetch('http://hootandhawat-001-site1.ftempurl.com/api/add/fish_order', {
                method: 'post',
                headers: {
                    'AuthKey': token
                },
                body: formData
            }).then(response => {
                
            }).catch(err => {
                
            })*/


            let form = {};
            form.user_id = this.props.store.userId
            form.fish_id = this.props.data.f_id
            axios.defaults.headers.common = {};
            
            //axios.defaults.headers.common['AuthKey'] = token
            //axios.defaults.headers.common['Content-Type'] = "multipart/form-data"
            //axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
            axios.post('http://hootandhawat-001-site1.ftempurl.com/api/add/fish_order', formData,{
                headers: {
                    
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then(Response => {
                    
                    this.setState({ buying: false })
                    if (Response.data.code == 1) {

                        this.setState({ buying: false, bought: true, btnTxt: this.props.store.strings.pending })
                    }
                    else if (Response.data.code == 4) {
                        this.setState({ buying: false, bought: true, btnTxt: this.props.store.strings.ordered })
                    }
                    else if (Response.data.code == 5) {
                        this.setState({ buying: false, bought: true, btnTxt: this.props.store.strings.unavailable })
                    }

                })
                .catch(err => console.log(err));
        }
        else {
            Actions.signIn()
        }
    }

    renderBtn = () => {
        if (this.props.store.userType == 'user' || this.props.store.userType == null) {
            if (this.state.buying == false) {
                return (<Button block warning style={{ width: 150, height: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} onPress={() => this.handleBuy()}>
                    <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.state.btnTxt}</Text>
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
        if (this.props.store.selectedFish == this.props.data.f_id) {
            return (
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', padding: 10 }}>
                    <Left>
                        {this.renderBtn()}

                    </Left>
                    <Right>
                        {this.props.data.f_delevary == 0 ? null : <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.deliverAvailable} </Text>}
                        {this.props.data.f_cooking == 0 ? null : <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.cookAvailable}</Text>}
                        <Text style={{ color: 'black', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.quantity} {this.props.data.f_quantity} {this.props.store.strings.kg}</Text>

                    </Right>
                </View>
            )

        }
        else {
            return null
        }
    }
    render() {
        return (
            <View style={{ width: '98%', paddingBottom: 0, alignContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', marginBottom: 10 }}>

                <Button transparent style={{ width: '100%', height: 200, borderRadius: 10, flexDirection: 'column' }} onPress={() => this.props.store.setSlectedFish(this.props.data.f_id)}>
                    <Image style={{ position: 'absolute', width: responsiveWidth(98), height: 200, borderRadius: 10 }} source={{ uri: this.props.data.f_image }} />
                    <View style={{ width: '100%', justifyContent: 'space-between', height: '100%', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>

                        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'rgba(000,000,000,.5)', padding: 10 }}>

                            <Left>
                                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                    <Icon name="cash" style={{ color: '#f29521', width: 40, alignSelf: 'center', }} />
                                    <Text style={{ width: '100%', color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.data.f_price} {this.props.store.strings.riyal}</Text>
                                </View>


                            </Left>
                            <Right>
                                <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.data.f_name}</Text>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', marginRight: 10 }}>{this.props.store.strings.fishing_date} {this.props.data.created_at}</Text>
                                    <Icon style={{ color: '#f29521' }} name='calendar' />
                                </View>
                            </Right>
                        </View>
                    </View>

                </Button>


                {this.renderDetails()}
                <Toast ref="toast" />
            </View>
        );
    }
}
