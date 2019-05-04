import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text, ImageBackground ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";


@inject("store")
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };
  }

  componentDidMount() {

    pLink = '';
    if (this.props.store.userType == 'user') {
      pLink = 'http://hootandhawat-001-site1.ftempurl.com/api/get/profile/type=user&id=' + this.props.store.userId
    }
    else if (this.props.store.userType == 'customer') {
      pLink = 'http://hootandhawat-001-site1.ftempurl.com/api/get/profile/type=customer&id=' + this.props.store.userId
    }


    axios.get(pLink, {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        
        if (this.props.store.userType == 'user') {
          this.setState({ data: Response.data.user, loading: false })
        }
        else if (this.props.store.userType == 'customer') {
          this.setState({ data: Response.data.customer, loading: false })
        }



      })
      .catch(err => console.log(err));


  }

  renderImg = () => {
    if (this.props.store.userType == 'user') {
      return(<Image source={{uri:this.state.data.image}} style={{ width: responsiveWidth(50), minHeight:responsiveHeight(30),maxHeight: responsiveHeight(30), alignSelf: 'center' }} />)
    }
    else if (this.props.store.userType == 'customer') {
      return(<Image source={require('../assets/imgs/ic_dummy_user.png')} style={{ width: responsiveWidth(50), minHeight:responsiveHeight(30), maxHeight: responsiveHeight(30), alignSelf: 'center' }} />)
    }
  }
  rendCont = () => {
    if (this.state.loading == true) {
      return (<Spinner />)
    }
    else {
      return (
        <View>
          {this.renderImg()}
          <View style={{ width: '100%', height: '40%', justifyContent: 'space-around' }}>


            <View style={styles.roww}>
              <Text style={styles.txts}>{this.state.data.name}</Text>
              <Icon name='person' style={{ fontSize: responsiveFontSize(3) }} />
            </View>

            <View style={styles.roww}>
              <Text style={styles.txts}>{this.state.data.email}</Text>
              <Icon name='mail' style={{ fontSize: responsiveFontSize(3) }} />
            </View>

            <View style={styles.roww}>
              <Text style={styles.txts}>{this.state.data.mobile}</Text>
              <Icon name='call' style={{ fontSize: responsiveFontSize(3) }} />
            </View>

            <View style={styles.roww}>
              <Text style={styles.txts}>{this.props.store.userType == 'customer' ? this.state.data.boatName : this.state.data.address}</Text>
              <Icon name={this.props.store.userType == 'customer' ? 'boat' : 'pin'} style={{ fontSize: responsiveFontSize(3) }} />
            </View>
          </View>
        </View>
      )
    }
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
            <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.profile}</Title>
          </Body>
          <Right>

            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: 'white' }} />
            </Button>

          </Right>
        </Header>

        {this.rendCont()}

      </ImageBackground>
    )
  }
}

const styles = {
  roww: {
    width: responsiveWidth(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'
  },
  txts:
  {
    width: '90%', fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', textAlign: 'right'
  }
}
