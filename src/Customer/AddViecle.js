import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, View, Text, TextInput, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, { DURATION } from 'react-native-easy-toast'

const options = {
    title: 'اختر صورة',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
};

@inject("store")
@observer
export default class AddViecle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [{ label: '0', value: 0 }],
            marins: [],
            type: null,
            marin: null,
            image: null,
            desc: null,
            regNum: null,
        };
    }

    sendAd = () => {


        if (this.state.type == null || this.state.marin == null || this.state.boat_name == null || this.state.image == null || this.state.desc == null || this.state.regNum == null) {
            this.refs.toast.show(this.props.store.strings.fill_all)
        }
        else {
            this.setState({ spinner: true })
            let data = new FormData()
            data.append("image", this.state.image);

            data.append('c_id', this.props.store.userId);
            data.append('v_vehicle_type_id', this.state.type);
            data.append('boat_name', this.state.boat_name);
            data.append('v_register_number', this.state.regNum);
            data.append('v_des', this.state.desc);
            data.append('marasi_id', this.state.marin);

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            var st = this;
            xhr.addEventListener("readystatechange", function () {
                
                if (this.readyState === 4) {
                    st.setState({ spinner: false })
                    
                    res = JSON.parse(this.responseText);
                    if (res.code == 200) {
                        if (res.success == true) {
                            st.refs.toast.show(st.props.store.strings.v_added, 500)
                            st.setState(st.initialState)
                        }
                        else {
                            st.refs.toast.show(res.data, 500)
                        }
                    }
                    else {
                        st.refs.toast.show(st.props.store.strings.err, 500)
                    }
                    //
                }



            });

            xhr.open("POST", "http://hootandhawat-001-site1.ftempurl.com/api/add/vehicle");


            xhr.send(data);

        }

    }


    async getImage() {
        
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                ImagePicker.showImagePicker(options, (response) => {
                    

                    if (response.didCancel) {
                        
                    } else if (response.error) {
                        
                    } else if (response.customButton) {
                        
                    } else {
                        const source = { uri: response.uri };

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                       
                        this.setState({
                            image: {
                                uri: response.uri,
                                type: 'image/jpeg', // or photo.type
                                name: 'photo'
                            }
                        });
                    }
                });

                
            } else {
                
            }
        } catch (err) {
            console.warn(err)
        }


    }

    componentDidMount() {
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/vehicle_types/all', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                
                var temp = [];

                for (var i = 0; i < Response.data.length; i++) {
                    temp.push({ label: Response.data[i].name, value: Response.data[i].id })
                }
                
                this.setState({ types: temp, loadingTypes: false })

            })
            .catch(err => console.log(err));

        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/marasi/all', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                
                var temp2 = [];

                for (var i = 0; i < Response.data.marasi.length; i++) {
                    temp2.push({ label: Response.data.marasi[i].m_name, value: Response.data.marasi[i].m_id })
                }
                
                this.setState({ marins: temp2, loadingTypes: false })

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
                        <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.add_v}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>
                <KeyboardAwareScrollView style={{ width: '100%' }}>
                    <Button transparent style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }}>
                        <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10 }} name='arrow-down' />
                        <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                                label: this.props.store.strings.boat_type,
                                value: null,
                            }}
                            items={this.state.types}
                            onValueChange={(value) => {
                                this.setState({
                                    type: value,
                                });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.type}
                            placeholderTextColor='black'

                        />
                    </Button>

                    <Button style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }}>
                        <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10 }} name='arrow-down' />
                        <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                                label: this.props.store.strings.marin,
                                value: null,
                            }}
                            items={this.state.marins}
                            onValueChange={(value) => {
                                this.setState({
                                    marin: value,
                                });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.marin}
                            placeholderTextColor='black'

                        />
                    </Button>
                    <Button style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }}>
                        <TextInput
                            style={{ width: '97%' }}
                            placeholder={this.props.store.strings.boat_name}
                            onChangeText={(txt) => this.setState({ boat_name: txt })}
                            value={this.state.boat_name}
                        />
                    </Button>
                    <Button style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }} onPress={() => this.getImage()}>
                        <Icon name='images' style={{ color: 'black', fontSize: responsiveFontSize(5) }} />
                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.upload}</Text>
                    </Button>

                    <Button style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }}>
                        <TextInput

                            style={{ width: '97%' }}
                            placeholder={this.props.store.strings.register_no}
                            onChangeText={(txt) => this.setState({ regNum: txt })}
                            value={this.state.regNum}
                        />
                    </Button>
                    <Button style={{ backgroundColor: 'white', width: "95%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10) }}>
                        <TextInput

                            style={{ width: '97%' }}
                            placeholder={this.props.store.strings.desc}
                            onChangeText={(txt) => this.setState({ desc: txt })}
                            value={this.state.desc}
                        />
                    </Button>

                    <Button style={{ width: "80%", borderRadius: 10, alignSelf: 'center', marginBottom: 5, height: responsiveHeight(10), justifyContent: 'center', }} onPress={()=>this.sendAd()}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(3) }}>{this.props.store.strings.add_v}</Text>
                    </Button>
                </KeyboardAwareScrollView>
                <Toast ref="toast" position='center' />
        <Spinner
          visible={this.state.spinner}
          textContent={this.props.store.strings.wait}
          textStyle={styles.spinnerTextStyle}
        />
            </View>
        );
    }
}


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {

        width: "90%",
        height: '100%',
        color: 'black',
        textAlign: 'right',
        height: responsiveHeight(7),
        marginRight: 10
    },
    inputIOS: {

        width: "90%",
        height: '100%',
        color: 'black',
        textAlign: 'right',
        height: responsiveHeight(7),
        marginRight: 10
    },
});
const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    
  })