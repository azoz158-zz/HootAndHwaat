import React, { Component } from 'react';
import { FlatList, Image, View, Text, TextInput,Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",]

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            to_Date: '',
            from_Date: '',
            curPicker: '',
            minValue: 0,
            maxValue: 1000,
            tripTime: 0,
            dive: false,
            family: false,
            picnic: false,
            fishing: false,

        };
    }
    componentDidMount() {

        var date = new Date();
        
        this.setState({ from_Date: (date.getDate() + " " + months[date.getMonth()]) })
        this.setState({ to_Date: ((date.getDate() + 1) + " " + months[date.getMonth()]) })
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        if (this.state.curPicker == 'from') {
            this.setState({ from_Date: (date.getDate() + " " + months[date.getMonth()]) })
        }
        else if (this.state.curPicker == 'to') {
            this.setState({ to_Date: (date.getDate() + " " + months[date.getMonth()]) })
        }
        
        this._hideDateTimePicker();
    };

    multiSliderValuesChange = values => {

        this.setState({ minValue: values[0], maxValue: values[1] })
        
    };

    render() {
        return (
            <View style={{ width: responsiveWidth(100) }}>
                <Header style={{ width: '100%', backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>البحث</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>

                <KeyboardAwareScrollView style={{ width: responsiveWidth(100) }} contentContainerStyle={{ alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>


                    <View style={{ width: responsiveWidth(100), alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>السعر</Text>
                            <Icon name="cash" style={{ color: '#f29521', marginLeft: 10, fontSize: responsiveFontSize(3) }} />
                        </View>
                        <View style={{ flexDirection: 'row', width: responsiveWidth(95), justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                            <Text>{this.state.minValue} ريال</Text>
                            <Text>{this.state.maxValue} ريال</Text>

                        </View>
                        <MultiSlider
                            enabledTwo={true}
                            values={[this.state.minValue, this.state.maxValue]}
                            min={this.state.minValue}
                            max={this.state.maxValue}
                            step={10}
                            allowOverlap
                            snapped
                            trackStyle={{ backgroundColor: 'grey' }}
                            containerStyle={{ height: 10 }}
                            selectedStyle={{ backgroundColor: '#f29521' }}
                            markerStyle={{ backgroundColor: '#f29521', width: 15, height: 15 }}
                            onValuesChange={this.multiSliderValuesChange}

                        //touchDimensions={{height:50,width:50,borderRadius:15,slipDisplacement:200}}
                        />
                    </View>
                    <View style={{ width: responsiveWidth(100), alignItems: 'center' }}>


                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>المدة</Text>
                            <Icon name="time" style={{ color: '#f29521', marginLeft: 10, fontSize: responsiveFontSize(3) }} />
                        </View>
                        <TextInput style={{ fontSize: responsiveFontSize(2.2), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', width: responsiveWidth(90), marginTop: 10, borderWidth: 1, height: responsiveHeight(7), textAlign: 'center', textAlignVertical: 'center', backgroundColor: 'white', borderColor: '#f29521' }}
                            placeholder='0 ساعات'
                            keyboardType='numeric'
                            onChangeText={(txt) => this.setState({ tripTime: txt })}
                        />
                    </View>
                    <View style={{ width: responsiveWidth(100), alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>ترتيب حسب</Text>
                            <Icon name="calendar" style={{ color: '#f29521', marginLeft: 10, fontSize: responsiveFontSize(3) }} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>

                            <Button style={{ width: responsiveWidth(30), height: responsiveHeight(15), backgroundColor: 'white', borderWidth: 1, borderColor: '#f29521', alignContent: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }} onPress={() => { this._showDateTimePicker(); this.setState({ curPicker: 'to' }) }}>
                                <Text>
                                    إلي
                        </Text>
                                <Text>
                                    {this.state.to_Date}
                                </Text>

                            </Button>

                            <Button style={{ width: responsiveWidth(30), height: responsiveHeight(15), backgroundColor: 'white', borderWidth: 1, borderColor: '#f29521', alignContent: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }} onPress={() => { this._showDateTimePicker(); this.setState({ curPicker: 'from' }) }}>
                                <Text>
                                    من
                        </Text>
                                <Text>
                                    {this.state.from_Date}
                                </Text>

                            </Button>

                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>

                        <Button transparent style={{ backgroundColor:this.state.fishing==true?'#f29521':'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={()=>{this.setState({fishing:this.state.fishing==true?false:true})}}>
                            <Image resizeMode='contain' source={require('../assets/imgs/fishing.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>صيد</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor:this.state.picnic==true?'#f29521':'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={()=>{this.setState({picnic:this.state.picnic==true?false:true})}}>
                            <Image resizeMode='contain' source={require('../assets/imgs/yacht.png')} style={{ width: responsiveWidth(15) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>نزهة</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor:this.state.family==true?'#f29521':'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={()=>{this.setState({family:this.state.family==true?false:true})}}>
                            <Image resizeMode='contain' source={require('../assets/imgs/family.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>عائلية</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor:this.state.dive==true?'#f29521':'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={()=>{this.setState({dive:this.state.dive==true?false:true})}}>
                            <Image resizeMode='contain' source={require('../assets/imgs/dive.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>غوص</Text>
                        </Button>

                    </View>

                    <Button style={{ width: '80%', backgroundColor: '#f29521', alignSelf: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(3) }}>
                            بحث
                    </Text>
                    </Button>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}


