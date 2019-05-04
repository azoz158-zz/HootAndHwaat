import React, { Component } from 'react';
import { PermissionsAndroid, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TextInput, ImageBackground, View, Text ,Platform} from 'react-native';
import { Header, Left, Icon, Button } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import { observer, inject, computed } from "mobx-react";
import ValidationComponent from 'react-native-form-validator';
import Toast, { DURATION } from 'react-native-easy-toast'
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const messages = {
  en: {
    numbers: 'يرجي ادخال رقم صحيح',
    email: 'يرجي ادخال بريد اليكتروني صحيح',
    required:'يجب ملئ جميع الحقول',
    minlength: 'يجب ان لا تقل  كلمة السر عن 6 حروف او ارقام',
    maxlength: 'The field "{0}" length must be lower than {1}.'
  },
}
const options = {
  title: 'اختر صورة',
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};


@inject("store")
export default class RegisterFisher extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner:false,
      page: 1,
      items: this.props.store.cities,
      image: null,
      marasi: [
        {
          label: 'مراسي البحر الأحمر',
          value: '1',
        },
        {
          label: 'مراسي البحر المتوسط',
          value: '2',
        }

      ],
      boats: [
        {
          label: this.props.store.strings.speed_boat,
          value: '1',
        },
        {
          label: this.props.store.strings.boat,
          value: '2',
        },
        {
          label: this.props.store.strings.jet,
          value: '3',
        },
        {
          label: this.props.store.strings.yacht,
          value: '4',
        }
      ],
      slectedMarin: null,
      selectedBoat: null,
      city: null,
      userName: '',
      userMail: '',
      userPhone: '',
      userPassword: '',
      confirmPassword: '',
      boatName: '',
      regNum: '',
      details: ''
    };
  }

  finalsubmit = () => {
    st=this;
    if (this.state.slectedMarin != null && this.state.selectedBoat != null && this.state.image != null && this.state.boatName != '' && this.state.regNum != '') {
      this.setState({spinner:true})
      axios.post('http://hootandhawat-001-site1.ftempurl.com/api/customer/register', {

        name: this.state.userName,
        mobile: this.state.userPhone,
        email: this.state.userMail,
        password: this.state.userPassword,
        boatName: this.state.boatName,
        city_id: this.state.city,

      })
        // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
        .then(Response => {
          
          st.setState({spinner:false})
          if(Response.data.code == 200)
          {
            st.refs.toast.show(this.props.store.strings.register_ok,500,()=>{Actions.selectionScreen()})
            setTimeout(Actions.selectionScreen,600)
          }
          else
          {
            st.refs.toast.show(Response.data.error.message)
          }

        })
        .catch(err =>{st.setState({spinner:false}); });

    }
    else {


      this.refs.toast.show(this.props.store.strings.fill_all)

    }
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
        this.setState({ page: 2 })
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
           
            this.setState({ image: source });
          }
        });

        
      } else {
        
      }
    } catch (err) {
      console.warn(err)
    }


  }
  renderPage1 = () => {
    return (
      <View style={{ width: '100%' }}>
        <Text style={{ width: '40%', borderRadius: responsiveWidth(2), textAlign: 'center', fontSize: responsiveFontSize(2.5), color: 'white', borderColor: 'white', borderWidth: 1, alignSelf: 'center', marginTop: 10 }}>{this.props.store.strings.register_profider}</Text>
        <KeyboardAwareScrollView style={{ width: '100%' }}>

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
                placeholder={this.props.store.strings.pone}
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
              <Button onPress={this.submit} block style={{ width: '80%', alignSelf: 'center', borderRadius: responsiveWidth(5), backgroundColor: '#f29521' }}><Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>{this.props.store.strings.continue}</Text></Button>
            </View>


          </View>


        </KeyboardAwareScrollView>


      </View>
    )
  }

  renderPage2 = () => {
    return (

      <KeyboardAwareScrollView>
        <View style={styles.container}>

          <Icon name='arrow-dropdown' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            placeholder={{
              label: this.props.store.strings.marin,
              value: null,
            }}
            items={this.state.marasi}
            onValueChange={(value) => {
              this.setState({
                slectedMarin: value,
              });
            }}

            style={{ ...pickerSelectStyles2 }}
            value={this.state.slectedMarin}
            placeholderTextColor='black'

          />


        </View>

        <View style={styles.container}>

          <Icon name='arrow-dropdown' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            placeholder={{
              label: this.props.store.strings.boat_type,
              value: null,
            }}
            items={this.state.boats}
            onValueChange={(value) => {
              this.setState({
                selectedBoat: value,
              });
            }}

            style={{ ...pickerSelectStyles2 }}
            value={this.state.selectedBoat}
            placeholderTextColor='black'

          />
        </View>

        <TouchableOpacity style={styles.container} onPress={() => this.getImage()}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='images' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
            <Icon name='images' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, }} />
          </View>

          <Text style={{ fontSize: responsiveFontSize(2), marginRight: 5, color: 'black' }}>رفع صورة</Text>

        </TouchableOpacity>
        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>{this.props.store.strings.boat_name}</Text>
          <TextInput style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, height: 40, color: 'black' }}
            onChangeText={(txt) => { this.setState({ boatName: txt }) }}
            placeholder='قارب السعادة'
          />

        </View>

        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>{this.props.store.strings.register_no}</Text>
          <TextInput style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', height: 40 }}
            onChangeText={(txt) => { this.setState({ regNum: txt }) }}
            placeholder='0000'
          />

        </View>

        <View style={styles.container2}>

          <Text style={{ width: '100%', textAlign: "right", fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', marginTop: 5 }}>{this.props.store.strings.desc}</Text>
          <TextInput style={{ width: '100%', textAlign: "right", height: 80, fontSize: responsiveFontSize(2), marginRight: 10, color: 'black', textAlignVertical: 'top' }}
            placeholder=''
            onChangeText={(txt) => { this.setState({ details: txt }) }}
          />

        </View>

        <View style={{ marginTop: responsiveHeight(2), marginBottom: 50, width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <Button block style={{ width: '80%', alignSelf: 'center', borderRadius: responsiveWidth(5), backgroundColor: '#f29521' }} onPress={() => { this.finalsubmit() }}><Text style={{ fontSize: responsiveFontSize(3), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', color: 'white' }}>{this.props.store.strings.register}</Text></Button>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  handleBack = () => {
    if (this.state.page == 1) {
      Actions.pop()
    }
    else {
      this.setState({ page: 1 })
    }
  }

  render() {
    return (

      <View style={{ width: '100%' }}>
        <Image style={{ position: 'absolute', width: responsiveWidth(100), height: responsiveHeight(100) }} source={require('../../assets/imgs/3.png')} />
        <Header style={{ backgroundColor: 'rgba(00,00,00,0)', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0, width: '100%' }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => this.handleBack()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>
          </Left>
        </Header>

        {this.state.page == 1 ? this.renderPage1() : this.renderPage2()}
        <Spinner
          visible={this.state.spinner}
          textContent={'برجاء الانتظار ...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref="toast" />
      </View>

    );
  }
}

const styles = StyleSheet.create(
  {
    spinnerTextStyle: {
      color: '#FFF'
  },
    container: {
      width: responsiveWidth(90), backgroundColor: 'white', alignSelf: 'center', borderRadius: responsiveWidth(3), shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 2, marginTop: 5, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between', minHeight: 40,
    },
    container2: {
      width: responsiveWidth(90), backgroundColor: 'white', alignSelf: 'center', borderRadius: responsiveWidth(3), shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 2, marginTop: 5, alignContent: 'center', alignItems: 'center', justifyContent: 'space-between', minHeight: 40,
    }
  }
)

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

const pickerSelectStyles2 = StyleSheet.create({
  inputAndroid: {

    width: responsiveWidth(80),
    color: 'black',
    textAlign: 'right',
    fontSize: responsiveFontSize(2.5)
    , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'

  },
  inputIOS: {

    width: responsiveWidth(80),
    color: 'black',
    textAlign: 'right',
    fontSize: responsiveFontSize(2.5)
    , fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'

  },
});

