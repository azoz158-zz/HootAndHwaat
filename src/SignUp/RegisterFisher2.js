import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, ScrollView, TextInput, ImageBackground, View, Text ,Platform} from 'react-native';
import { Header, Left, Icon, Button, Body } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';

export default class RegisterFisher2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [

      ],

    };
  }

  render() {
    return (

      <View>
        <View style={{ position: 'absolute', width: responsiveWidth(100), height: responsiveHeight(100), backgroundColor: '#fafafa' }}>
        </View>
        <Header style={{ backgroundColor: 'rgba(00,00,00,0)', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0, width: '100%' }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', }}>مركبات</Text>
          </Body>
        </Header>
        <KeyboardAwareScrollView>
        <View style={styles.container}>

          <Icon name='arrow-dropdown' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            placeholder={{
              label: 'اسم المرسي',
              value: null,
            }}
            items={this.state.items}
            onValueChange={(value) => {
              this.setState({
                selected: value,
              });
            }}

            style={{ ...pickerSelectStyles }}
            value={this.state.selected}
            placeholderTextColor='black'

          />


        </View>

        <View style={styles.container}>

          <Icon name='arrow-dropdown' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            placeholder={{
              label: 'اسم المرسي',
              value: null,
            }}
            items={this.state.items}
            onValueChange={(value) => {
              this.setState({
                selected: value,
              });
            }}

            style={{ ...pickerSelectStyles }}
            value={this.state.selected}
            placeholderTextColor='black'

          />
        </View>

        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='photos' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
            <Icon name='photos' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          </View>

          <Text style={{ fontSize: responsiveFontSize(2), marginRight: 5, color: 'black' }}>رفع صورة</Text>

        </View>
        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>اسم القارب</Text>
          <TextInput style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, height: 40, color: 'black' }}
            placeholder='قارب السعادة'
          />

        </View>

        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>اسم القارب</Text>
          <TextInput style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', height: 40 }}
            placeholder='قارب السعادة'
          />

        </View>

        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>اسم القارب</Text>
          <TextInput style={{ width: '100%', textAlign: "right", height: 80, fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', textAlignVertical: 'top' }}
            placeholder='قارب السعادة'
          />

        </View>

        <View style={{ marginTop: responsiveHeight(2), marginBottom: 50, width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <Button block style={{ width: '80%', alignSelf: 'center', borderRadius: responsiveWidth(5), backgroundColor: '#f29521' }}><Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>تسجيل</Text></Button>
        </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}



const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {


    color: 'white',
    textAlign: 'right',
    marginRight: 5,
    height: 40


  },
  inputIOS: {


    color: 'white',
    textAlign: 'right',
    marginRight: 5,
    height: 40


  },
});