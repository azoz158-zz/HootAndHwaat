import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TripCard from '../comps/TripCard';
import axios from 'react-native-axios';
import FishCard from '../comps/FishCard'
import { observer, inject, computed } from "mobx-react";



@inject("store")
@observer
export default class UserFish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishes: null,
            fishTypes: [],
            loading: true,
            loadingTypes: true,
            selectedType: null,
            filtered: false,
            page: 1,
            maxPage: 1,
            isListScrolled: false
        };
    }


    componentDidMount() {
        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/fishes/all/city_id=' + this.props.store.selectedCity + '&page=1', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                if (!String(Response.data.data).includes("No record")) {

                    this.props.store.setFishs(Response.data.data)
                    this.setState({ fishes: Response.data.data, loading: false, maxPage: Response.data.last_page })

                }
                else {
                    this.setState({ fishes: null, loading: false })
                }


            })
            .catch(err => console.log(err));

        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/get/types', {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {



                this.setState({ fishTypes: Response.data.types, loadingTypes: false })


            })
            .catch(err => console.log(err));


    }


    filterTypes(my_object, my_criteria) {

        return my_object.filter(function (obj) {
            return Object.keys(my_criteria).every(function (c) {
                return obj[c] == my_criteria[c];
            });
        });

    }
    setTypes = () => {
        this.setState({ loading: true, filtered: true, fishes: null, page: 1 });
        setTimeout(() => {

            axios.get('http://hootandhawat-001-site1.ftempurl.com/api/fishes/get_using_type/type_id=' + this.state.selectedType + '&city_id=' + this.props.store.selectedCity + '&page=1', {

            })
                // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
                .then(Response => {

                    if (!String(Response.data.data).includes("No record")) {

                        this.props.store.setFishs(Response.data.data)
                        this.setState({ fishes: Response.data.data, loading: false })

                    }
                    else {
                        this.setState({ fishes: null, loading: false })
                    }


                })
                .catch(err => console.log(err));

            //this.setState({ fishes: this.filterTypes(this.props.store.fishs, { f_type_id: this.state.selectedType }) })



        }, 100);
    }

    renderTypes = () => {
        if (this.state.loadingTypes == true) {
            return null
        }
        else {
            return (this.state.fishTypes.map((item, index) =>
                <Button key={index} style={{ width: 80, height: 80, backgroundColor: this.state.selectedType == item.f_t_id ? '#f29521' : 'white', borderRadius: 80, borderWidth: 1, borderColor: '#f29521', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={() => { this.setState({ selectedType: item.f_t_id }); this.setTypes() }}>
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2), width: '100%', textAlign: 'center', color: this.state.selectedType == item.f_t_id ? 'white' : 'black' }}>{item.f_name}</Text>
                </Button>

            ))
        }
    }

    renderPre = () => {
        if (this.state.loading == true) {
            return (<View style={{ width: "100%", alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Spinner />
            </View>)
        }
        else {
            return null
        }
    }

    loadMore = () => {
        if (this.state.isListScrolled == true) {
            if (this.state.page < this.state.maxPage) {
                this.setState({ page: this.state.page + 1 })
                setTimeout(() => {
                    if (this.state.filtered == false) {
                        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/fishes/all/city_id=' + this.props.store.selectedCity + '&page=' + this.state.page, {

                        })
                            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
                            .then(Response => {

                                if (!String(Response.data.data).includes("No record")) {

                                    //this.props.store.setFishs(Response.data.data)
                                    //this.setState({ fishes: Response.data.data, loading: false, maxPage: Response.data.last_page })
                                    console.log(Response.data)
                                    var da = this.state.fishes
                                    // self.setState({loading:false});
                                    Response.data.data.map((fish) => (da.push(fish)))

                                }
                                else {
                                    this.setState({ fishes: null, loading: false })
                                }


                            })
                            .catch(err => console.log(err));

                    }
                    else {
                        console.log('more', this.state.page, this.state.maxPage)
                        axios.get('http://hootandhawat-001-site1.ftempurl.com/api/fishes/get_using_type/type_id=' + this.state.selectedType + '&city_id=' + this.props.store.selectedCity + '&page=' + this.state.page, {

                        })
                            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
                            .then(Response => {

                                if (!String(Response.data.data).includes("No record")) {

                                    /*this.props.store.setFishs(Response.data.data)
                                    this.setState({ fishes: Response.data.data, loading: false })*/
                                    var da = this.state.fishes
                                    // self.setState({loading:false});
                                    Response.data.data.map((fish) => (da.push(fish)))

                                }
                                else {
                                    this.setState({ fishes: null, loading: false })
                                }


                            })
                            .catch(err => console.log(err));
                    }
                }, 100);
            }
        }
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
                        <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.fishOffers}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>
                <View>
                    <ScrollView horizontal style={{ margin: 5 }}>
                        {this.renderTypes()}
                    </ScrollView>
                </View>


                <FlatList
                    contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}
                    keyExtractor={(item, index) => index.toString()}
                    //refreshing = {this.state.refreshing}
                    // onRefresh = {this.refresh}
                    onEndReached={() => { this.loadMore() }}
                    onEndReachedThreshold={0.01}
                    onScrollEndDrag={() => { this.setState({ isListScrolled: true }); }}
                    data={this.state.fishes}
                    //ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item, index }) => (<FishCard data={item} ind={index}

                    >

                    </FishCard>)}
                />


                {this.renderPre()}
            </View>
        );
    }
}
