import React, { Component } from 'react';
import { Alert, TextInput, StyleSheet, Picker, Image, ImageBackground, View, Text, Keyboard ,Platform} from 'react-native';
import { Segment, Header, Left, Button, Body, Right, Title, Tabs, Tab, TabHeading, Container,Icon } from 'native-base';
import axios from 'react-native-axios';
import { Actions } from 'react-native-router-flux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, { DURATION } from 'react-native-easy-toast'
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{ label: this.props.store.strings.user, value: 1 }, { label: this.props.store.strings.s_provider, value: 2 }],
            type: null,
            spinner: false,
            page: 0,
        };
    }


    renderCont = () => {
        if (this.state.page == 0) {
            return (
                <View style={{width:'100%',height:'100%'}}>
                    <Image resizeMode='contain' style={{ width: "80%", height: '50%',alignSelf:'center' }} source={require('../assets/imgs/logo.png')} />

                    <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20 }}>
                        <Button transparent style={{ height: responsiveWidth(40), flexDirection: 'column' }} onPress={() => this.setState({ type: 1, page: 1 })}>
                            <View style={{ width: responsiveWidth(40), height: responsiveWidth(40), backgroundColor: 'white', borderRadius: responsiveWidth(5), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Image resizeMode='contain' style={{ height: responsiveHeight(20),maxWidth:responsiveWidth(35) }} source={require('../assets/imgs/client.png')} />
                            </View>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>العميل</Text>
                        </Button>

                        <Button transparent style={{ height: responsiveWidth(40), flexDirection: 'column', }} onPress={() => this.setState({ type: 2, page: 1 })}>
                            <View style={{ width: responsiveWidth(40), height: responsiveWidth(40), backgroundColor: 'white', borderRadius: responsiveWidth(5), alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Image resizeMode='contain' style={{ height: responsiveHeight(20),maxWidth:responsiveWidth(35) }} source={require('../assets/imgs/fisher.png')} />
                            </View>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>مقدم الخدمة</Text>
                        </Button>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{width:'100%',height:'100%'}}>
                    <Image resizeMode='contain' style={{ width: "80%", height: '30%',alignSelf:'center' }} source={require('../assets/imgs/logo.png')} />
                    
                    <Formik
                        initialValues={{ userMail: '', password: '' }}

                        onSubmit={values => {
                           
                            if (this.state.type == 1 || this.state.type == 2) {

                                this.setState({ spinner: true })

                                if (this.state.type == 1) {
                                    axios.post('http://hootandhawat-001-site1.ftempurl.com/api/user/login', {
                                        "email": values.userMail, "password": values.password
                                    })
                                        .then(Response => {
                                            console.log(Response)
                                            this.setState({ spinner: false })
                                            if (Response.data.code == 200) {
                                                this.refs.toast.show('تم تسجيل الدخول بنجاح');
                                                this.props.store.setUserData(Response.data.user)
                                                this.props.store.setLogin(true)
                                                this.props.store.setUserId(Response.data.user.user_id)
                                                this.props.store.setUserKey(Response.data.user.token)
                                                this.props.store.setUserType('user')
                                                Actions.selectionScreen()
                                            }
                                            else {
                                                this.refs.toast.show(this.props.store.strings.login_fail);
                                            }

                                        })
                                        .catch(err => console.log(err));
                                }
                                else {

                                    axios.post('http://hootandhawat-001-site1.ftempurl.com/api/customer/login', {
                                        "email": values.userMail, "password": values.password
                                    })
                                        .then(Response => {
                                            console.log(Response)
                                            this.setState({ spinner: false })
                                            if (Response.data.code == 200) {
                                                this.refs.toast.show('تم تسجيل الدخول بنجاح')
                                                this.props.store.setUserData(Response.data.user)
                                                this.props.store.setLogin(true)
                                                this.props.store.setUserId(Response.data.user.customer_id)
                                                this.props.store.setUserKey(Response.data.user.token)
                                                this.props.store.setUserType('customer')
                                                Actions.selectionScreen()
                                            }
                                            else {
                                                this.refs.toast.show(this.props.store.strings.login_fail);
                                            }

                                        })
                                        .catch(err => console.log(err));

                                }
                            }
                            else {

                                this.refs.toast.show('برجاء اختيار نوع الحساب');

                            }




                            Keyboard.dismiss();
                        }
                        }>
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View style={{ width: '100%', height: '35%', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                                <View style={{ width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

                                    <TextInput
                                        onChangeText={handleChange('userMail')}
                                        value={values.userMail}
                                        label={this.props.store.strings.mail}
                                        placeholder={this.props.store.strings.mail}
                                        style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                                        placeholderTextColor='white'
                                    />
                                    <Icon name='person' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
                                </View>


                                <View style={{ width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

                                    <TextInput
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        label={this.props.store.strings.password}
                                        placeholder={this.props.store.strings.password}
                                        style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                                        placeholderTextColor='white'
                                    />
                                    <Icon name='lock' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
                                </View>
                                <View style={{ width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                    <Button block onPress={handleSubmit} style={{ width: '80%', alignSelf: 'center', borderRadius: responsiveWidth(5), backgroundColor: '#f29521' }}><Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>{this.props.store.strings.login}</Text></Button>
                                </View>

                            </View>
                        )}


                    </Formik>

                    <Button transparent style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 50 }} onPress={() => {this.state.type ==1?Actions.registerUser():Actions.registerFisher() }}>
                        <Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>{this.props.store.strings.register}</Text>
                    </Button>
                    <Toast ref="toast" />
                    <Spinner
                        visible={this.state.spinner}
                        textContent={this.props.store.strings.wait}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>

            )

        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/imgs/5.png')} style={{ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center' }}>
            <Header style={{ backgroundColor: 'rgba(00,00,00,0)', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0,width:responsiveWidth(100) }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                        
                    </Left>
                    <Body>
                        
                    </Body>
                    <Right>
                      

                    </Right>
                </Header>
                {this.renderCont()}
            </ImageBackground>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {

        width: responsiveWidth(90),
        color: 'white',
        textAlign: 'right',
        fontSize: responsiveFontSize(2.5)
        , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'


    },
    inputIOS: {

        width: responsiveWidth(90),
        color: 'white',
        textAlign: 'right',
        fontSize: responsiveFontSize(2.5)
        , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'


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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});