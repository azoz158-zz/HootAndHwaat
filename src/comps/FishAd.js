import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, View, Text, TextInput, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, ListItem, Radio, List, Content } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, { DURATION } from 'react-native-easy-toast';
import { CheckBox } from 'react-native-elements'


const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",]
const options = {
    title: 'اختر صورة',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

@inject("store")
export default class FishAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            selectedCity: null,
            fishType: null,
            fishTypes: [],
            items: [
            ],
            weightVisible: false,
            tempWeight: 0,
            weight: 0,
            priceVisible: false,
            tempPrice: 0,
            price: 0,
            delivery: null,
            cook: null,
            image: null,
            isDateTimePickerVisible: false,
            fishing_Date: '',
            quaVisible: false,
            tempQua: null,
            qua: null,
        };

        this.initialState = {
            spinner: false,
            selectedCity: null,
            fishType: null,
            fishTypes: [],
            items: [
            ],
            weightVisible: false,
            tempWeight: 0,
            weight: 0,
            priceVisible: false,
            tempPrice: 0,
            price: 0,
            delivery: null,
            cook: null,
            image: null,
            isDateTimePickerVisible: false,
            fishing_Date: '',
            quaVisible: false,
            tempQua: null,
            qua: null,
        }
    }

    componentDidMount() {
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/types', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {


                if (Response.data.types != "No records") {

                    tempTypes = [];
                    for (var t = 0; t < Response.data.types.length; t++) {
                        tempTypes.push({ label: Response.data.types[t].f_name, value: Response.data.types[t].f_t_id })
                    }
                    this.setState({ fishTypes: tempTypes })
                }
                else {

                    this.setState({ fishTypes: null })
                }

            })
            .catch(err => console.log(err));
    }

    sendAd = () => {


        if (this.state.delivery == null || this.state.cook == null || this.state.fishType == null || this.state.price == null || this.state.weight == null || this.state.selectedCity == null || this.state.image == null || this.state.qua == null) {

            this.refs.toast.show(this.props.store.strings.fill_all)

        }
        else {

            this.setState({ spinner: true })
            var data = new FormData();
            data.append("c_id", this.props.store.userId);
            data.append("fish_delevary", this.state.delivery);
            data.append("fish_cooking", this.state.cook);
            data.append("fish_type_id", this.state.fishType);
            data.append("fish_price", this.state.price);
            data.append("fish_weight", this.state.weight);
            data.append("fish_des", "");
            data.append("fish_quantity", this.state.qua);
            data.append("city_id", this.state.selectedCity);
            data.append("images[]", this.state.image);


            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            var st = this;
            xhr.addEventListener("readystatechange", function () {

                if (this.readyState === 4) {
                    st.setState({ spinner: false })

                    res = JSON.parse(this.responseText);
                    if (res.code == 200) {
                        if (res.success == true) {
                            st.refs.toast.show(st.props.store.strings.ad_sent, 500)
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

            xhr.open("POST", "http://hootandhawat-001-site1.ftempurl.com/api/add/fish/");


            xhr.send(data);

        }

    }

    getImage = () => {
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
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        this.setState({ fishing_Date: (date.getDate() + " " + months[date.getMonth()]) })


        this._hideDateTimePicker();
    };

    renderPrice = () => {
        return (
            <Dialog.Container visible={this.state.priceVisible}>
                <Dialog.Title>{this.props.store.strings.price}</Dialog.Title>
                <Dialog.Input placeholder='0' keyboardType='numeric' onChangeText={(txt) => this.setState({ tempPrice: txt })} />
                <Dialog.Button label="Cancel" onPress={() => this.setState({ priceVisible: false })} />
                <Dialog.Button label="Ok" onPress={() => this.setState({ priceVisible: false, price: this.state.tempPrice })} />
            </Dialog.Container>
        )
    }

    renderWeight = () => {
        return (
            <Dialog.Container visible={this.state.weightVisible}>
                <Dialog.Title>{this.props.store.strings.weight}</Dialog.Title>
                <Dialog.Input placeholder='0' keyboardType='numeric' onChangeText={(txt) => this.setState({ tempWeight: txt })} />
                <Dialog.Button label="Cancel" onPress={() => this.setState({ weightVisible: false })} />
                <Dialog.Button label="Ok" onPress={() => this.setState({ weightVisible: false, weight: this.state.tempWeight })} />
            </Dialog.Container>
        )
    }

    renderQua = () => {
        return (
            <Dialog.Container visible={this.state.quaVisible}>
                <Dialog.Title>{this.props.store.strings.quantity}</Dialog.Title>
                <Dialog.Input placeholder='0' keyboardType='numeric' onChangeText={(txt) => this.setState({ tempQua: txt })} />
                <Dialog.Button label="Cancel" onPress={() => this.setState({ quaVisible: false })} />
                <Dialog.Button label="Ok" onPress={() => this.setState({ quaVisible: false, qua: this.state.tempQua })} />
            </Dialog.Container>
        )
    }

    render() {
        return (
            <View>
                <Toast ref="toast" position='center' />
                <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', width: responsiveWidth(100) }}>

                    <Button style={{
                        flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                        <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10,position:'absolute' }} name='arrow-down' />
                        <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                                label: this.props.store.strings.city,
                                value: null,
                            }}
                            items={this.props.store.cities}
                            onValueChange={(value) => {
                                this.setState({
                                    selectedCity: value,
                                });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.selectedCity}
                            placeholderTextColor='black'

                        />

                    </Button>


                    <Button style={{
                        flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                        <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10 ,position:'absolute'}} name='arrow-down' />
                        <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                                label: this.props.store.strings.fish_type,
                                value: null,
                            }}
                            items={this.state.fishTypes}
                            onValueChange={(value) => {
                                this.setState({
                                    fishType: value,
                                });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.fishType}
                            placeholderTextColor='black'

                        />

                    </Button>


                    <Button style={{
                        width: '90%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7),
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }} onPress={() => { this.setState({ isDateTimePickerVisible: true }) }} >
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                            <Icon style={{ color: 'black' }} name='calendar' />
                            <Text>{this.state.fishing_Date}</Text>
                        </View>

                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.fishingDate}</Text>

                    </Button>

                    <Button style={{
                        width: '90%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7),
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }} onPress={() => this.setState({ weightVisible: true })}>
                        <Text style={{ marginLeft: 10 }}>{this.state.weight} {this.props.store.strings.kg}</Text>
                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.weight}</Text>
                    </Button>

                    <Button style={{
                        width: '90%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7),
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }} onPress={() => this.setState({ quaVisible: true })}>
                        <Text style={{ marginLeft: 10 }}>{this.state.qua}</Text>
                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.quantity}</Text>
                    </Button>

                    <Button style={{
                        width: '90%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7),
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }} onPress={() => this.setState({ priceVisible: true })}>
                        <Text style={{ marginLeft: 10 }}>{this.state.price} {this.props.store.strings.riyal}</Text>
                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.price}</Text>
                    </Button>

                    <Button style={{
                        width: '90%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7),
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }} onPress={() => { this.getImage() }}>
                        <Icon style={{ color: 'black' }} name='camera' />
                        <Text style={{ marginRight: 10 }}>{this.props.store.strings.upload_phott}</Text>

                    </Button>

                    <Button style={{
                        width: '90%', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(12), flexDirection: 'column', alignContent: "flex-start", alignItems: 'flex-end', justifyContent: 'flex-start',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                        <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.2) }}>التوصيل</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>

                            <CheckBox
                                center
                                title={this.props.store.strings.not_available}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.delivery == true ? true : false}
                                onPress={() => this.setState({ delivery: true })}
                                containerStyle={{ backgroundColor: '#F0F0F0', width: '40%' }}
                                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
                            />

                            <CheckBox
                                center
                                title={this.props.store.strings.available}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.delivery == false ? true : false}
                                onPress={() => this.setState({ delivery: false })}
                                containerStyle={{ backgroundColor: '#F0F0F0', width: '40%' }}
                                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
                            />
                            {/* <View style={{ width: '30%', justifyContent: 'flex-end', flexDirection: 'row' }}>

                                <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.not_available}</Text>

                                <Radio onPress={() => this.setState({ delivery: true })} selected={this.state.delivery == true ? true : false} />
                            </View>
                            <View style={{ width: '30%', justifyContent: 'flex-end', flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.available}</Text>

                                <Radio onPress={() => this.setState({ delivery: false })} selected={this.state.delivery == false ? true : false} />

                </View>*/}
                        </View>


                    </Button>

                    <Button style={{
                        width: '90%', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(12), flexDirection: 'column', alignContent: "flex-start", alignItems: 'flex-end', justifyContent: 'flex-start',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                        <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2.2) }}>الطبخ</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>

                        <CheckBox
                                center
                                title={this.props.store.strings.not_available}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.cook == true ? true : false}
                                onPress={() => this.setState({ cook: true })}
                                containerStyle={{ backgroundColor: '#F0F0F0', width: '40%' }}
                                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
                            />

                            <CheckBox
                                center
                                title={this.props.store.strings.available}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.cook == false ? true : false}
                                onPress={() => this.setState({ cook: false })}
                                containerStyle={{ backgroundColor: '#F0F0F0', width: '40%' }}
                                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
                            />
                            {/*<View style={{ width: '30%', justifyContent: 'flex-end', flexDirection: 'row' }}>

                                <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.not_available}</Text>

                                <Radio onPress={() => this.setState({ cook: true })} selected={this.state.cook == true ? true : false} />
                            </View>
                            <View style={{ width: '30%', justifyContent: 'flex-end', flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.available}</Text>

                                <Radio onPress={() => this.setState({ cook: false })} selected={this.state.cook == false ? true : false} />

                </View>*/}
                        </View>


                    </Button>

                    <Button style={{ width: '90%', backgroundColor: '#ff9511', alignSelf: 'center', justifyContent: 'center', marginTop: responsiveHeight(1), height: 40, marginBottom: 20, }} onPress={() => { this.sendAd() }}>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(3), color: 'white' }}>{this.props.store.strings.create}</Text>
                    </Button>


                </KeyboardAwareScrollView>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                {this.renderWeight()}
                {this.renderPrice()}
                {this.renderQua()}


                <Spinner
                    visible={this.state.spinner}
                    textContent={this.props.store.strings.wait}
                    textStyle={styles.spinnerTextStyle}
                />
            </View >
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {

        width: responsiveWidth(90),
        color: 'black',
        textAlign: 'right',
        height: responsiveHeight(7),
        marginRight: 10
    },
    inputIOS: {

        width: responsiveWidth(90),
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
})