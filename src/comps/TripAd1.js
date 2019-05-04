import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, PermissionsAndroid, FlatList, Image, View, Text, TextInput, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, ListItem, Radio, List, Content } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, { DURATION } from 'react-native-easy-toast'
import { CheckBox } from 'react-native-elements'

const options = {
  title: 'اختر صورة',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    loadingVs: true,
    loadingPeriods: true,
    loadingTypes: true,

  },
};

@inject("store")
export default class TripAd1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null,
      cities: [

      ],
      selectedShip: null,
      ships: [

      ],
      periods: [],
      period: null,
      tripTime: '',
      tempTime: '',
      tripTimeVisible: false,
      priceVisible: false,
      tempPrice: 0,
      price: null,
      page: 0,
      tripDateVisible: false,
      fromTimeVisible: false,
      toTimeVisible: false,
      tripDate: null,
      fromTime: null,
      toTime: null,
      image: null,
      tripTypes: [],
      tripType: null,
      laaf: false,
      diving: false,
      juice: false,
      food: false
    };

    this.initialState = {
      selectedCity: null,
      cities: [

      ],
      selectedShip: null,
      ships: [

      ],
      periods: [],
      period: null,
      tripTime: '',
      tempTime: '',
      tripTimeVisible: false,
      priceVisible: false,
      tempPrice: 0,
      price: null,
      page: 0,
      tripDateVisible: false,
      fromTimeVisible: false,
      toTimeVisible: false,
      tripDate: null,
      fromTime: null,
      toTime: null,
      image: null,
      tripTypes: [],
      tripType: null,
      laaf: false,
      diving: false,
      juice: false,
      food: false
    }
  }

  sendAd = () => {


    if (this.state.selectedCity == null || this.state.selectedShip == null || this.state.tripType == null || this.state.tripDate == null || this.state.period == null || this.state.fromTime == null || this.state.toTime == null || this.state.price == null) {
      this.refs.toast.show(this.props.store.strings.fill_all)
    }
    else {
      this.setState({ spinner: true })
      var data = new FormData();
      servs = [];
      if (this.state.laaf == true) {
        servs.push('لعف')
        data.append("services[]", 'لعف')
      }

      if (this.state.diving == true) {
        servs.push('غوض')
        data.append("services[]", 'غوص')
      }

      if (this.state.juice == true) {
        servs.push('عصيرات')
        data.append("services[]", 'عصيرات')
      }

      if (this.state.food == true) {
        servs.push('أكل')
        data.append("services[]", 'أكل')
      }

      data.append("images[]", this.state.image);
      data.append('c_id', this.props.store.userId)
      data.append('t_vehicle_id', this.state.selectedShip)
      data.append('t_type_id', this.state.tripType)
      data.append('t_date', this.state.tripDate)
      data.append('t_period_time', this.state.period)
      data.append('t_start_time', this.state.fromTime)
      data.append('t_end_time', this.state.toTime)
      data.append('city_id', this.state.selectedCity)
      data.append('t_price', this.state.price)

      /*data.append("c_id", "5");
      data.append("t_vehicle_id", "1");
      data.append("t_type_id", "2");
      data.append("t_date", "2018-9-26");
      data.append("t_period_time", "2");
      data.append("t_start_time", "05:00:00");
      data.append("t_end_time", "07:30:00");
      data.append("city_id", "2");
      data.append("t_price", "150");
      
      data.append("services[]", "غوص ");
      data.append("services[]", "عائليه");
      data.append("services[]", "نزهه ");*/

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

      xhr.open("POST", "http://hootandhawat-001-site1.ftempurl.com/api/add/trip/");


      xhr.send(data);


      /* formData.append('c_id', this.props.store.userId)
       formData.append('t_vehicle_id', this.state.selectedShip)
       formData.append('t_type_id', this.state.tripType)
       formData.append('t_date', this.state.tripDate)
       formData.append('t_period_time', this.state.period)
       formData.append('t_start_time', this.state.fromTime)
       formData.append('t_end_time', this.state.toTime)
       formData.append('city_id',this.state.selectedCity)
       formData.append('t_price', this.state.price)
       formData.append('images[]', this.state.image)
 
       
 
       axios.post('http://hootandhawat-001-site1.ftempurl.com/api/add/trip',formData, {
 
           headers: {
             'Content-Type': 'multipart/form-data'
           }
         })
         // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
         .then(Response => {
           this.setState({ spinner: false })
           
           if (Response.data.code == 200) {
             this.refs.toast.show('تم إضافة الاعلان بنجاح', 500, () => { this.state = this.initialState })
 
           }
           else {
 
             this.refs.toast.show(Response.data.error.message)
           }
 
         })
         .catch(err => {console.log(err); this.setState({ spinner: false }); this.refs.toast.show("حدث خطأ يرجي المحاولة مره أخري") });*/
    }

  }

  componentDidMount() {

    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/vehicles/all/user_id=' + this.props.store.userId, {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        console.log(Response.data)
        if (Response.data.vehicles != "No records") {

          tempShips = [];
          for (var i = 0; i < Response.data.vehicles.length; i++) {
            tempShips.push({ label: Response.data.vehicles[i].boat_name, value: Response.data.vehicles[i].id })
          }
          this.setState({ ships: tempShips, loadingVs: false })
        }
        else {

          this.setState({ orders: null })
        }

      })
      .catch(err => console.log(err));


    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/trip/types', {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        console.log(Response.data)
        if (Response.data.types != "No records") {

          tempTypes = [];
          for (var t = 0; t < Response.data.types.length; t++) {
            tempTypes.push({ label: Response.data.types[t].type, value: Response.data.types[t].id })
          }
          this.setState({ tripTypes: tempTypes, loadingTypes: false })
        }
        else {

          this.setState({ tripTypes: null })
        }

      })
      .catch(err => console.log(err));

    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/trip/periods', {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        console.log(Response.data)
        if (Response.data.data != "No records") {

          tempPeriods = [];
          for (var p = 0; p < Response.data.periods.length; p++) {
            tempPeriods.push({ label: Response.data.periods[p].t_time, value: Response.data.periods[p].t_id })
          }
          this.setState({ periods: tempPeriods, loadingPeriods: false })
        }
        else {

          this.setState({ periods: null })
        }

      })
      .catch(err => console.log(err));


  }


  async getImage() {
    if (Platform.OS === 'android') {
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
    else {
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




  }

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

  renderTripTime = () => {
    return (
      <Dialog.Container visible={this.state.tripTimeVisible}>
        <Dialog.Title>{this.props.store.strings.period}</Dialog.Title>
        <Dialog.Input placeholder='0' keyboardType='numeric' onChangeText={(txt) => this.setState({ tempTime: txt })} />
        <Dialog.Button label="Cancel" onPress={() => this.setState({ tripTimeVisible: false })} />
        <Dialog.Button label="Ok" onPress={() => this.setState({ tripTimeVisible: false, tripTime: this.state.tempTime })} />
      </Dialog.Container>
    )
  }

  renderPage1 = () => {
    return (
      <KeyboardAwareScrollView style={{ width: '100%' }}>
        <Button style={{
          flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center', shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }}>
          <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10, position:'absolute'}} name='arrow-down' />
          <RNPickerSelect
            hideIcon={true}
            placeholder={{
              label: this.props.store.strings.boat_type,
              value: null,
            }}
            items={this.state.ships}
            onValueChange={(value) => {
              this.setState({
                selectedShip: value,
              });
            }}
            useNativeAndroidPickerStyle={false}
            style={{ ...pickerSelectStyles }}
            value={this.state.selectedShip}
            placeholderTextColor='black'

          />

        </Button>

        <Button style={{
          flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center', shadowColor: '#000',
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
          width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7), shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }} onPress={() => { this.getImage() }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='images' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, color: 'black' }} />
            <Icon name='images' style={{ fontSize: responsiveFontSize(4), marginLeft: 10, color: 'black' }} />
          </View>

          <Text style={{ fontSize: responsiveFontSize(2), marginRight: 5, color: 'black' }}>صورة</Text>

        </Button>

        <Button style={{
          width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7), shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }} onPress={() => { this.setState({ tripDateVisible: true }) }}>
          <Icon style={{ color: 'black' }} name='calendar' />
          <Text style={{ marginRight: 10 }}>{this.props.store.strings.sail_date} {this.state.tripDate}</Text>

        </Button>

        <View style={{ flexDirection: 'row', width: responsiveWidth(90), alignSelf: 'center' }}>
          <Button style={{
            width: '50%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7), justifyContent: 'center', shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 1,
          }} onPress={() => { this.setState({ toTimeVisible: true }) }}>
            <Text style={{ marginRight: 10 }}>{this.state.toTime == null ? this.props.store.strings.from : this.state.toTime}</Text>
          </Button>
          <Button style={{
            width: '50%', alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7), justifyContent: 'center', shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 1,
          }} onPress={() => { this.setState({ fromTimeVisible: true }) }}>
            <Text style={{ marginRight: 10 }}>{this.state.fromTime == null ? this.props.store.strings.to : this.state.fromTime}</Text>
          </Button>
        </View>

        <Button style={{
          flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center', shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }}>
          <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10,position:'absolute' }} name='arrow-down' /><RNPickerSelect
            hideIcon={true}
            placeholder={{
              label: this.props.store.strings.period,
              value: null,
            }}
            items={this.state.periods}
            onValueChange={(value) => {
              this.setState({
                period: value,
              });
            }}
            useNativeAndroidPickerStyle={false}
            style={{ ...pickerSelectStyles }}
            value={this.state.period}
            placeholderTextColor='black'

          />
        </Button>



        {this.renderTripTime()}



        <View style={{
          width: responsiveWidth(90), backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', flexDirection: 'column', alignContent: "flex-start", alignItems: 'flex-end', justifyContent: 'flex-start', shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }}>

          <View style={{ width: '100%', justifyContent: 'flex-end', backgroundColor: '#F0F0F0' }}>
            <View style={{ width: '80%', justifyContent: 'space-around', flexDirection: 'row' }}>
              <CheckBox
                center
                title={this.props.store.strings.diving}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.diving}
                onPress={() => this.setState({ diving: this.state.diving == false ? true : false })}
                containerStyle={{ backgroundColor: '#F0F0F0',width:'40%' }}
                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
              />

              <CheckBox
                center
                title={this.props.store.strings.laaf}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.laaf}
                onPress={() => this.setState({ laaf: this.state.laaf == false ? true : false })}
                containerStyle={{ backgroundColor: '#F0F0F0',width:'40%' }}
                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
              />
            </View>

            <View style={{ width: '80%', justifyContent: 'space-around', flexDirection: 'row' }}>
              <CheckBox
                center
                title={this.props.store.strings.food}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.food}
                onPress={() => this.setState({ food: this.state.food == false ? true : false })}
                containerStyle={{ backgroundColor: '#F0F0F0',width:'40%' }}
                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
              />

              <CheckBox
                center
                title={this.props.store.strings.juice}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.juice}
                onPress={() => this.setState({ juice: this.state.juice == false ? true : false })}
                containerStyle={{ backgroundColor: '#F0F0F0',width:'40%' }}
                textStyle={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), color: 'black' }}
              />
            </View>


          </View>



        </View>

        <Button style={{
          flexDirection: 'row', width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), height: responsiveHeight(7), alignSelf: 'center', shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }}>
          <Icon style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10,position:'absolute' }} name='arrow-down' />
          <RNPickerSelect
            hideIcon={true}
            placeholder={{
              label: this.props.store.strings.trip_type,
              value: null,
            }}
            items={this.state.tripTypes}
            onValueChange={(value) => {
              this.setState({
                tripType: value,
              });
            }}
            useNativeAndroidPickerStyle={false}
            style={{ ...pickerSelectStyles }}
            value={this.state.tripType}
            placeholderTextColor='black'

          />
        </Button>



        <Button style={{
          width: responsiveWidth(90), alignContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), alignSelf: 'center', height: responsiveHeight(7), shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        }} onPress={() => this.setState({ priceVisible: true })}>
          <Text style={{ marginLeft: 10 }}>{this.state.price} {this.props.store.strings.riyal}</Text>
          <Text style={{ marginRight: 10 }}>{this.props.store.strings.price}</Text>
        </Button>

        <Button style={{ width: responsiveWidth(90), backgroundColor: '#ff9511', alignSelf: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), height: 40, marginBottom: 20 }} onPress={() => { this.sendAd() }}>
          <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(3), color: 'white' }}>{this.props.store.strings.create}</Text>
        </Button>

        {this.renderPrice()}
        <Toast ref="toast" position='center' />
        <Spinner
          visible={this.state.spinner}
          textContent={this.props.store.strings.wait}
          textStyle={styles.spinnerTextStyle}
        />
      </KeyboardAwareScrollView>
    )
  }




  hidePickers = () => {
    this.setState({ tripDateVisible: false, fromTimeVisible: false, toTimeVisible: false })
  }

  tripDatePicked = (date) => {
    day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
    month = date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
    year = date.getFullYear()

    this.setState({ tripDate: (year + "-" + month + '-' + day), tripDateVisible: false })
  }

  fromTimePicked = (time) => {
    hours = time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours();
    minutes = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
    seconds = time.getSeconds() < 10 ? ("0" + time.getSeconds()) : time.getSeconds()
    this.setState({ fromTime: hours + ":" + minutes + ":" + seconds, fromTimeVisible: false })
    //this.setState({fromTime:time})
  }

  toTimePicked = (time) => {

    hours = time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours();
    minutes = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
    seconds = time.getSeconds() < 10 ? ("0" + time.getSeconds()) : time.getSeconds()
    this.setState({ toTime: hours + ":" + minutes + ":" + seconds, toTimeVisible: false })
  }

  renderPages = () => {
    if (this.state.page == 0) {
      if (this.state.loadingPeriods == true || this.state.loadingTypes == true || this.state.loadingVs == true) {
        return <Spinner />
      }
      else {
        return (this.renderPage1())
      }

    }

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {



          this.renderPages()}
        <DateTimePicker
          isVisible={this.state.tripDateVisible}
          onConfirm={this.tripDatePicked}
          onCancel={this.hidePickers}
        />

        <DateTimePicker
          mode='time'
          isVisible={this.state.fromTimeVisible}
          onConfirm={this.fromTimePicked}
          onCancel={this.hidePickers}
        />

        <DateTimePicker
          mode='time'
          isVisible={this.state.toTimeVisible}
          onConfirm={this.toTimePicked}
          onCancel={this.hidePickers}
        />
      </View>
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
    backgroundColor: '#F5FCFF',
    
  },
})