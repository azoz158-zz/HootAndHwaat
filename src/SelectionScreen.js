import React, { Component } from 'react';
import { StyleSheet, Picker, Image, ImageBackground, View, Text,BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RNPickerSelect from 'react-native-picker-select';
import axios from 'react-native-axios';
import { Actions } from 'react-native-router-flux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Toast, {DURATION} from 'react-native-easy-toast'
import { observer, inject, computed } from "mobx-react";
import { Segment, Header, Left, Button, Body, Right, Title, Tabs, Tab, TabHeading, Container } from 'native-base';

@inject("store")
@observer
export default class SelectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            items: [

            ],
        };
    }
    onValueChange = () => {

    }

    componentDidMount() {

        
        //Actions.reset('selectionScreen')
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/cities/all', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                
                tempData = [];
                Response.data.map((item) => tempData.push({ label: item.c_name, value: item.c_id }))
                this.setState({ items: tempData })
                this.props.store.setCities(tempData)

            })
            .catch(err => console.log(err));

            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

    }

    handleBackPress = () => {
        console.log(Actions.currentScene)
        if(Actions.currentScene == 'selectionScreen' || Actions.currentScene == '_selectionScreen')
        {
          BackHandler.exitApp()
        }
       // 
      }


    goFish=()=>{

        if(this.state.selected == null)
        {
            this.refs.toast.show(this.props.store.strings.choose_city);
        }
        else
        {
            Actions.userFish()
        }

    }

    goTrips=()=>{

        if(this.state.selected == null)
        {
            this.refs.toast.show(this.props.store.strings.choose_city);
        }
        else
        {
            Actions.userCat()
        }

    }

    render() {
        return (
            <ImageBackground source={require('../assets/imgs/5.png')} style={{ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center' }}>
            <Header style={{ width: responsiveWidth(100), backgroundColor: 'rgba(00,00,00,0)', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        

                    </Left>
                    <Body>
                        
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white',fontSize:responsiveFontSize(4) }} />
                        </Button>

                    </Right>
                </Header>
                <Image resizeMode='contain' style={{ width: "80%", height: '28%' }} source={require('../assets/imgs/logo.png')} />
                <View style={{ flexDirection: 'row', borderBottomColor: 'white', borderBottomWidth: 1, width: '90%', alignContent: 'center', alignItems: 'center' }}>
                    <Icon style={{ color: 'white', fontSize: responsiveFontSize(2.5) }} name='keyboard-arrow-down' />
                    <RNPickerSelect
                        hideIcon={true}
                        placeholder={{
                            label: this.props.store.strings.city,
                            value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                            this.props.store.setSelectedCity(value)
                            this.setState({
                                selected: value,
                            });
                        }}

                        style={{ ...pickerSelectStyles }}
                        value={this.state.selected}
                        useNativeAndroidPickerStyle={false}

                    />
                    <Icon style={{ color: 'white', fontSize: responsiveFontSize(2.5) }} name='place' />

                </View>
                <View style={{ marginTop: 20 }}>
                    <Button transparent style={{ height: responsiveWidth(25), flexDirection: 'column', marginTop: 15, marginBottom: 20 }} onPress={() => this.goFish()}>
                        <View style={{ width: responsiveWidth(25), height: responsiveWidth(25), backgroundColor: 'white', borderRadius: responsiveWidth(25), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Image resizeMode='contain' style={{ height: responsiveHeight(10),maxWidth:responsiveWidth(20) }} source={require('../assets/imgs/fish.png')} />
                        </View>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.fishs}</Text>
                    </Button>

                    <Button transparent style={{ height: responsiveWidth(25), flexDirection: 'column', marginTop: 25 }} onPress={() =>this.goTrips()}>
                        <View style={{ width: responsiveWidth(25), height: responsiveWidth(25), backgroundColor: 'white', borderRadius: responsiveWidth(25), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Image resizeMode='contain' style={{ height: responsiveHeight(10),maxWidth:responsiveWidth(20) }} source={require('../assets/imgs/boat.png')} />
                        </View>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.trips}</Text>
                    </Button>
                </View>
                <Toast ref="toast"/>
            </ImageBackground>
        );
    }
}


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {

        width: responsiveWidth(80),
        color: 'white',
        textAlign: 'right',
    },
    inputIOS: {

        width: responsiveWidth(80),
        color: 'white',
        textAlign: 'right',
    },
});