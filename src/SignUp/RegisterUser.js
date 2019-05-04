import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, TextInput, ImageBackground, View, Text, StyleSheet,Platform } from 'react-native';
import { Header, Left, Icon, Button } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { observer, inject, computed } from "mobx-react";
import RNPickerSelect from 'react-native-picker-select';
import ValidationComponent from 'react-native-form-validator';
import Toast, { DURATION } from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'react-native-axios';
const messages = {
  en: {
    numbers: 'يرجي ادخال رقم صحيح',
    email: 'يرجي ادخال بريد اليكتروني صحيح',
    required:'يجب ملئ جميع الحقول',
    minlength: 'يجب ان لا تقل  كلمة السر عن 6 حروف او ارقام',
    maxlength: 'The field "{0}" length must be lower than {1}.'
  },
}
@inject("store")
@observer
export default class RegisterUser extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      userName: '',
      userMail: '',
      userPhone: '',
      userPassword: '',
      confirmPassword: ''
    };
  }

  submit = () => {
    this.validate({
      userName:{required:true},
      userMail: { email: true },
      userPhone: { numbers: true },
      userPassword: { minlength: 5 }
    });
    if (this.isFormValid() == true) {
      if (this.state.userPassword === this.state.confirmPassword) {

        this.setState({ spinner: true })
        axios.post('http://hootandhawat-001-site1.ftempurl.com/api/user/register', {

          email: this.state.userMail,
          password: this.state.userPassword,
          address: this.state.city,
          name: this.state.userName,
          mobile: this.state.userPhone,

        })
          // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
          .then(Response => {
            
            this.setState({ spinner: false })
            if (Response.data.code == 200) {
              this.refs.toast.show('تم التسجيل بنجاح', 500,()=>{Actions.selectionScreen()})
              
            }
            else {
              this.refs.toast.show(Response.data.error.message)
            }

          })
          .catch(err => { this.setState({ spinner: false });  });

      }
      else {
        this.refs.toast.show(this.props.store.strings.pass_conf)
      }
    }
    else {
      this.refs.toast.show(this.getErrorMessages())
    }


  }

 

  componentDidMount() {
    this.messages = messages;
    
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <Image style={{ position: 'absolute', width: responsiveWidth(100), height: responsiveHeight(100) }} source={require('../../assets/imgs/3.png')} />
        <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0, width: '100%' }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>
          </Left>
        </Header>

        <KeyboardAwareScrollView>

          <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <TextInput
                onChangeText={(txt) => this.setState({ userName: txt })}
                ref='userName'
                label={this.props.store.strings.name}
                placeholder={this.props.store.strings.name}
                style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                placeholderTextColor='white'
                value={this.state.userName}

              />
              <Icon name='person' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>

            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <TextInput
                onChangeText={(txt) => this.setState({ userMail: txt })}
                ref='userMail'
                label={this.props.store.strings.mail}
                placeholder={this.props.store.strings.mail}
                style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                placeholderTextColor='white'
                value={this.state.userMail}
              />
              <Icon name='mail' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>


            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <TextInput
                onChangeText={(txt) => this.setState({ userPhone: txt })}
                ref='userPhone'
                label={this.props.store.strings.phone}
                placeholder={this.props.store.strings.phone}
                style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                placeholderTextColor='white'
                value={this.state.userPhone}
              />
              <Icon name='call' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>
            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <RNPickerSelect
                hideIcon={true}
                placeholder={{
                  label: this.props.store.strings.city,
                  value: null,
                }}
                items={this.props.store.cities}
                onValueChange={(value) => {
                  this.setState({
                    city: value,
                  });
                }}
                placeholderTextColor='white'
                style={{ ...pickerSelectStyles }}
                value={this.state.type}
                useNativeAndroidPickerStyle={false}

              />
              <Icon name='pin' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>

            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <TextInput
                onChangeText={(txt) => this.setState({ userPassword: txt })}
                ref='userPassword'
                label={this.props.store.strings.password}
                placeholder={this.props.store.strings.password}
                style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                placeholderTextColor='white'
                value={this.state.userPassword}
              />
              <Icon name='lock' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>

            <View style={{ marginTop: responsiveHeight(2), width: '90%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>

              <TextInput
                onChangeText={(txt) => this.setState({ confirmPassword: txt })}
                ref='confirmPassword'
                label={this.props.store.strings.password}
                placeholder={this.props.store.strings.password}
                style={{ color: 'white', width: '90%', textAlign: 'right', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}
                placeholderTextColor='white'
                value={this.state.confirmPassword}
              />
              <Icon name='lock' style={{ color: 'white', marginLeft: 10, fontSize: responsiveFontSize(3.5), }} />
            </View>

            <View style={{ marginTop: responsiveHeight(2), width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
              <Button onPress={this.submit} block style={{ width: '80%', alignSelf: 'center', borderRadius: responsiveWidth(5), backgroundColor: '#f29521' }}><Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>{this.props.store.strings.register}</Text></Button>
            </View>


          </View>


        </KeyboardAwareScrollView>
        <Spinner
          visible={this.state.spinner}
          textContent={this.props.store.strings.wait}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref="toast" />
      </View>

    );
  }
}


const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {

    width: responsiveWidth(80),
    color: 'white',
    textAlign: 'right',
    fontSize: responsiveFontSize(2.5)
    , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'


  },
  inputIOS: {

    width: responsiveWidth(80),
    color: 'white',
    textAlign: 'right',
    fontSize: responsiveFontSize(2.5)
    , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'


  },
});

const styles = StyleSheet.create({
  spinnerTextStyle: {
      color: '#FFF'
  },})