import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text, ImageBackground, TextInput ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';
import Toast, { DURATION } from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';

const messages = {
  en: {
    numbers: 'يرجي ادخال رقم صحيح',
    email: 'يرجي ادخال بريد اليكتروني صحيح',
    required:'يرجي ملئ جميع البيانات',
    minlength: 'يجب ان لا تقل  كلمة السر عن 6 حروف او ارقام',
    maxlength: 'The field "{0}" length must be lower than {1}.'
  },
}

@inject("store")
export default class Contact extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      name: null,
      mail: "",
      topic: null,
      message: null,
      spinner:false
    };
  }

  sendM=()=>{

    this.validate({

      mail:{ email: true },
      name:{required:true},
      topic:{required:true},
      data:{required:true}
      
    });
    
    if (this.isFormValid() == true) {
      if(this.state.name == null || this.state.topic == null || this.state.message == null )
      {
        this.refs.toast.show(this.props.store.strings.fill_all)
      }
      else
      {
        this.setState({spinner:true})
        var formData = new FormData();
        formData.append("name",this.state.name)
        formData.append("email",this.state.mail)
        formData.append("subject",this.state.topic)
        formData.append("message",this.state.message)

        axios.post('http://hootandhawat-001-site1.ftempurl.com/api/contact_us', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          
          .then(Response => {
            
            this.refs.toast.show(this.props.store.strings.message_sent)
            this.setState({spinner:false})
          })
          .catch(err => { this.setState({ spinner: false });  });
      }

    }
    else
    {
      this.refs.toast.show(this.getErrorMessages())
    }
    
    
  }
  componentDidMount() {
    this.messages = messages;
  }
  render() {
    return (
      <ImageBackground source={require('../assets/imgs/3.png')} style={{ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center' }}>
        <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0, width: '100%' }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>

          </Left>
          <Body>
            <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.contact}</Title>
          </Body>
          <Right>

            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: 'white' }} />
            </Button>

          </Right>
        </Header>

        <KeyboardAwareScrollView style={{ width: '100%' }}>
          <View style={styles.roww}>

            <TextInput
              placeholder={this.props.store.strings.name}
              ref='name'
              placeholderTextColor='black'
              style={styles.txts}
              onChangeText={(txt) => { this.setState({ name: txt }) }}
              value={this.state.name}
            />
            <Icon name='person' style={{ fontSize: responsiveFontSize(3) }} />
          </View>

          <View style={styles.roww}>

            <TextInput
              placeholder={this.props.store.strings.mail}
              ref='mail'
              placeholderTextColor='black'
              style={styles.txts}
              onChangeText={(mail) => { this.setState({mail}) }}
              value={this.state.mail}
            />
            <Icon name='mail' style={{ fontSize: responsiveFontSize(3) }} />
          </View>

          <View style={styles.roww}>

            <TextInput
              placeholder={this.props.store.strings.topic}
              ref='topic'
              placeholderTextColor='black'
              style={styles.txts}
              onChangeText={(txt) => { this.setState({ topic: txt }) }}
              value={this.state.topic}
            />
            <Icon name='create' style={{ fontSize: responsiveFontSize(3) }} />
          </View>

          <View style={{width: responsiveWidth(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start',
    height: responsiveHeight(20), borderColor: 'white', borderWidth: 1, borderRadius: 10, paddingRight: 10, backgroundColor: 'white', marginTop: 10,}}>

            <TextInput
            ref='message'
              placeholder={this.props.store.strings.message}
              placeholderTextColor='black'
              style={{width: '90%', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', textAlign: 'right',height:'100%',textAlignVertical:'top'}}
              onChangeText={(txt) => { this.setState({ message: txt }) }}
              value={this.state.message}
            />
            <Icon name='create' style={{ fontSize: responsiveFontSize(3),marginTop:10 }} />
          </View>

          <Button style={{width:responsiveWidth(80),alignSelf:'center',marginTop:20,justifyContent:'center',borderRadius:10,backgroundColor:'#f29521'}} onPress={()=>{this.sendM()}}>
            <Text style={{color:'white',fontSize:responsiveFontSize(3),fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light'}}>{this.props.store.strings.send}</Text>
          </Button>
        </KeyboardAwareScrollView>


<Spinner
          visible={this.state.spinner}
          textContent={this.props.store.strings.wait}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref="toast" />
      </ImageBackground>
    )
  }
}

const styles = {
  roww: {
    width: responsiveWidth(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center',
    height: responsiveHeight(10), borderColor: 'white', borderWidth: 1, borderRadius: 10, paddingRight: 10, backgroundColor: 'white', marginTop: 10,
  },
  txts:
  {
    width: '90%', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', textAlign: 'right'
  }
}
