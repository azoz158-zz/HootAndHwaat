import React, { Component } from 'react';
import { FlatList, Image, View, Text, Modal, TextInput ,Platform,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Radio, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TripCard from '../comps/TripCard';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";
const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",]

@inject("store")
@observer
export default class UserCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: null,
            loading: true,
            loadingMarins: true,
            marasi: null,
            loadingTypes: true,
            types: null,
            selectedMarasi: 1,
            selectedType: 1,


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
            filterVisible: false,
            filter: null,
            isListScrolled: false,
            page: 1,
            maxPage: 0,
            sort:'',
        };
    }

    filterTypes(my_object, my_criteria) {
        
        return my_object.filter(function (obj) {
            return Object.keys(my_criteria).every(function (c) {
                return obj[c] == my_criteria[c];
            });
        });

    }
    //this.props.store.selectedCity 
    loadTrips = () => {
        this.setState({ loading: true, trips: null, page: 1 })

        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/trips/for/marasi_id=' + this.state.selectedMarasi + '&beach=' + this.state.selectedType + '&city_id=' + this.props.store.selectedCity + '&page=1&price='+this.state.sort, {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                
                if (Response.data.data != "No records") {
                    this.props.store.setTrips(Response.data.data)
                    this.setState({ trips: Response.data.data, loading: false })
                }
                else {

                    this.setState({ trips: null, loading: false })
                }

            })
            .catch(err => console.log(err));
    }

    loadMore = () => {
        if (this.state.page < this.state.maxPage) {
            this.setState({ page: this.state.page + 1 })
            setTimeout(() => {

                axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/trips/for/marasi_id=' + this.state.selectedMarasi + '&beach=' + this.state.selectedType + '&city_id=' + this.props.store.selectedCity + '&page=' + this.state.page+'&price='+this.state.sort, {

                })
                    // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
                    .then(Response => {

                        
                        var da = this.state.trips
                        // self.setState({loading:false});
                        Response.data.data.map((trip) => (da.push(trip)))

                    })
                    .catch(err => console.log(err));

            }, 1);

        }

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

    renderFilter = () => {
        return (
            <View style={{ width: responsiveWidth(100) }}>
                <Header style={{ width: '100%', backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => this.setState({ filterVisible: false })}>
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

                        <Button transparent style={{ backgroundColor: this.state.fishing == true ? '#f29521' : 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={() => { this.setState({ fishing: this.state.fishing == true ? false : true }) }}>
                            <Image resizeMode='contain' source={require('../../assets/imgs/fishing.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>صيد</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor: this.state.picnic == true ? '#f29521' : 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={() => { this.setState({ picnic: this.state.picnic == true ? false : true }) }}>
                            <Image resizeMode='contain' source={require('../../assets/imgs/yacht.png')} style={{ width: responsiveWidth(15) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>نزهة</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor: this.state.family == true ? '#f29521' : 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={() => { this.setState({ family: this.state.family == true ? false : true }) }}>
                            <Image resizeMode='contain' source={require('../../assets/imgs/family.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>عائلية</Text>
                        </Button>


                        <Button transparent style={{ backgroundColor: this.state.dive == true ? '#f29521' : 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(20), flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', borderColor: '#f29521', borderWidth: 1 }} onPress={() => { this.setState({ dive: this.state.dive == true ? false : true }) }}>
                            <Image resizeMode='contain' source={require('../../assets/imgs/dive.png')} style={{ height: responsiveWidth(10) }} />
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black' }}>غوص</Text>
                        </Button>

                    </View>

                    <Button style={{ width: '80%', backgroundColor: '#f29521', alignSelf: 'center', justifyContent: 'center', marginTop: 30 }}
                        onPress={() => { this.setState({ filterVisible: false }) }}>
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
        )
    }

    componentDidMount() {

        console.log(this.props.store.selectedCity)
        var date = new Date();
        
        this.setState({ from_Date: (date.getDate() + " " + months[date.getMonth()]) })
        this.setState({ to_Date: ((date.getDate() + 1) + " " + months[date.getMonth()]) })

        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/trips/for/marasi_id=' + this.state.selectedMarasi + '&beach=1&city_id=' + this.props.store.selectedCity + '&page=1', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {
                
                if (Response.data.data != "No records") {
                    this.props.store.setTrips(Response.data.data)
                    this.setState({ trips: Response.data.data, loading: false, maxPage: Response.data.last_page })
                }
                else {
                    this.setState({ trips: null, loading: false })
                }


            })
            .catch(err => console.log(err));


        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/marasi/all/city_id='+this.props.store.selectedCity , {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {


                this.setState({ marasi: Response.data.marasi, loadingMarins: false })

            })
            .catch(err => console.log(err));



        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/vehicle_types/all', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                
                this.setState({ types: Response.data, loadingTypes: false })

            })
            .catch(err => console.log(err));

    }
    setType = (e) => {
        st = this
        setTimeout(() => {

            
            this.setState({ trips: this.filterTypes(this.props.store.trips.slice(), { vehicle_type: this.state.selectedType }) })
            
        }, 100)

    }

    renderPre = () => {
        if (this.state.loading == true) {
            return (<View style={{ width: "100%", height: "100%", alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Spinner />
            </View>)
        }
        else {
            return null
        }
    }


    renderMarasi = () => {
        if (this.state.loadingMarins == false) {
            return (this.state.marasi.map((item, index) => <Button block style={{ width: responsiveWidth(35), height: responsiveHeight(5), backgroundColor: this.state.selectedMarasi == item.m_id ? '#f29521' : '#f7dbb3',borderColor:'white',borderRightWidth:1 }} key={index} onPress={() => {
                this.setState({ selectedMarasi: item.m_id }); setTimeout(() => {
                    this.loadTrips()
                }, 50);
            }}>
                <Text style={{ color: this.state.selectedMarasi == item.m_id ? 'white' : 'black', fontSize: responsiveFontSize(2), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{item.m_name}</Text>
            </Button>))
        }
        else {
            return null;
        }
    }

    renderTypes = () => {
        if (this.state.loadingTypes == false) {
            return (this.state.types.map((item, index) => <Button transparent style={{ padding: 5, borderBottomWidth: this.state.selectedType == item.id ? 3 : 0, borderBottomColor: "#f29521" }} key={index} onPress={() => {
                this.setState({ selectedType: item.id }); setTimeout(() => {
                    this.loadTrips()
                }, 50);
            }}>
                <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{item.name}</Text>
            </Button>))
        }
        else {
            return null;
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '' }}>
                <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                        <Button transparent onPress={() => { this.setState({ filterVisible: true }) }}>
                            <Icon name='funnel' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.trips}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>
                <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                <ScrollView horizontal>
                    {this.renderMarasi()}
                </ScrollView>
                    
                </View>


                <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white', marginBottom: 5 }}>
                    <Button transparent style={{ padding: 5, borderBottomWidth: this.state.selectedType == 4 ? 3 : 0, borderBottomColor: "#f29521", flexDirection: 'column' }} onPress={() => {
                        this.setState({ selectedType: 4 }); setTimeout(() => {
                            this.loadTrips()
                        }, 50);
                    }}>
                        <Image resizeMode='contain' style={{ height: '50%' }} source={require('../../assets/imgs/yacht.png')} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.yacht}</Text>
                    </Button>

                    <Button transparent style={{ padding: 5, borderBottomWidth: this.state.selectedType == 3 ? 3 : 0, borderBottomColor: "#f29521", flexDirection: 'column' }} onPress={() => {
                        this.setState({ selectedType: 3 }); setTimeout(() => {
                            this.loadTrips()
                        }, 50);
                    }}>
                        <Image resizeMode='contain' style={{ height: '50%' }} source={require('../../assets/imgs/jet.png')} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.jet}</Text>
                    </Button>

                    <Button transparent style={{ padding: 5, borderBottomWidth: this.state.selectedType == 2 ? 3 : 0, borderBottomColor: "#f29521", flexDirection: 'column' }} onPress={() => {
                        this.setState({ selectedType: 2 }); setTimeout(() => {
                            this.loadTrips()
                        }, 50);
                    }}>
                        <Image resizeMode='contain' style={{ height: '50%' }} source={require('../../assets/imgs/boat-1.png')} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.boat}</Text>
                    </Button>

                    <Button transparent style={{ padding: 5, borderBottomWidth: this.state.selectedType == 1 ? 3 : 0, borderBottomColor: "#f29521", flexDirection: 'column' }} onPress={() => {
                        this.setState({ selectedType: 1 }); setTimeout(() => {
                            this.loadTrips()
                        }, 50);
                    }}>
                        <Image resizeMode='contain' style={{ height: '50%' }} source={require('../../assets/imgs/speed-boat.png')} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{this.props.store.strings.speed_boat}</Text>
                    </Button>
                </View>


                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}
                        keyExtractor={(item, index) => index.toString()}
                        //refreshing = {this.state.refreshing}
                        // onRefresh = {this.refresh}
                        onEndReached={() => { this.loadMore() }}
                        onEndReachedThreshold={0.01}
                        onScrollEndDrag={() => { this.setState({ isListScrolled: true }); }}
                        data={this.state.trips}
                        //ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({ item, index }) => (<TripCard data={item} ind={index}

                        >

                        </TripCard>)}
                    />
                </View>


                <Dialog.Container visible={this.state.filterVisible}>
                    <Dialog.Title>{this.props.store.strings.sortt}</Dialog.Title>
                    <View style={{ flexDirection: 'row' }}>
                        <Radio onPress={() => {this.setState({ filter: 'ASC' })}} selected={this.state.filter == 'ASC' ? true : false} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10 }}>{this.props.store.strings.lower_price}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Radio onPress={() => {this.setState({ filter: 'DEC' })}} 
                        selected={this.state.filter == 'DEC' ? true : false} />
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2.5), marginLeft: 10 }}>{this.props.store.strings.high_price}</Text>
                    </View>
                    <Dialog.Button label="Cancel" onPress={() => { this.setState({ filterVisible: false, filter: null }) }} />
                    <Dialog.Button label="Ok" onPress={() => {this.setState({filterVisible:false,sort:this.state.filter});setTimeout(() => {
                      this.loadTrips()  
                    }, 100);}} />
                </Dialog.Container>
                {this.renderPre()}
            </View>
        );
    }
}
