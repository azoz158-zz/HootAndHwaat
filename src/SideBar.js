import React from "react";
import { AppRegistry, Image, StatusBar, Platform, View, TouchableHighlight,ScrollView } from "react-native";
import { Button, Text, Container, List, ListItem, Content, Input, Footer, Thumbnail, Icon } from "native-base";
import { Actions } from 'react-native-router-flux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class SideBar extends React.Component {

  state = {
    searchTxt: '',

  }

  renderSailor = () => {
    if (this.props.store.userType == 'customer') {
      return (
        <View>
          <ListItem style={styles.lis} button onPress={() => Actions.fisherViecles()}>

            <Text style={styles.txt}>{this.props.store.strings.vehicles}</Text>
          </ListItem>
          <ListItem style={styles.lis} button onPress={() => Actions.fisherAds()}>

            <Text style={styles.txt}>{this.props.store.strings.my_ads}</Text>
          </ListItem>

          <ListItem style={styles.lis} button >

            <Text style={styles.txt}>{this.props.store.strings.credit}: {this.props.store.userData.credits}</Text>
          </ListItem>
        </View>
      )
    }
    else {
      return null;
    }
  }

  renderMenu = () => {
    if (this.props.store.loggedIn == true) {
      return (


        <View style={{}}>

          <Image style={{ width: "80%", maxHeight: responsiveHeight(20), alignSelf: 'center' }} resizeMode='contain' source={require('../assets/imgs/ic_dummy_user.png')} />
          <List style={{ marginTop: responsiveHeight(4) }}>
            <ListItem style={styles.lis} button onPress={() => Actions.selectionScreen()}>
              <Text style={styles.txt}>{this.props.store.strings.home}</Text>
            </ListItem>
            {this.renderSailor()}
            <ListItem style={styles.lis} button onPress={() => { this.props.store.userType == 'customer' ? Actions.fisherFishOrders() : Actions.userFishOrders() }}>

              <Text style={styles.txt}>{this.props.store.strings.fish_orders}</Text>
            </ListItem>

            <ListItem style={styles.lis} button onPress={() => { this.props.store.userType == 'customer' ? Actions.fisherTripsOrders() : Actions.userTripsOrders() }}>

              <Text style={styles.txt}>{this.props.store.strings.trips_orders}</Text>
            </ListItem>

            <ListItem style={styles.lis} button onPress={() => Actions.profile()}>

              <Text style={styles.txt}>{this.props.store.strings.profile}</Text>
            </ListItem>
            <ListItem style={styles.lis} button onPress={() => { Actions.contact() }}>

              <Text style={styles.txt}>{this.props.store.strings.contact}</Text>
            </ListItem>

            <ListItem style={styles.lis} button onPress={() => { Actions.terms() }}>

              <Text style={styles.txt}>{this.props.store.strings.terms}</Text>
            </ListItem>

            <ListItem style={styles.lis} button onPress={() => { this.props.store.setLogin(false), this.props.store.setUserType(null); Actions.selectionScreen() }}>

              <Text style={styles.txt}>{this.props.store.strings.log_out}</Text>
            </ListItem>

          </List>
        </View>

      )
    }
    else {
      return (
        <View style={{ alignContent: 'flex-end', alignItems: 'flex-end' }}>

          <Image style={{ width: 150, height: 150 }} resizeMode='contain' source={require('../assets/imgs/ic_dummy_user.png')} />
          <List style={{ marginTop: responsiveHeight(4) }}>
            <ListItem style={styles.lis} button onPress={() => Actions.selectionScreen()}>
              <Text style={styles.txt}>{this.props.store.strings.home}</Text>
            </ListItem>
            <ListItem style={styles.lis} button onPress={() => Actions.signIn()}>

              <Text style={styles.txt}>{this.props.store.strings.login}</Text>
            </ListItem>
            <ListItem style={styles.lis} button onPress={() => { Actions.contact() }}>

              <Text style={styles.txt}>{this.props.store.strings.contact}</Text>
            </ListItem>

            <ListItem style={styles.lis} button onPress={() => { Actions.terms() }}>

              <Text style={styles.txt}>{this.props.store.strings.terms}</Text>
            </ListItem>

          </List>
        </View>

      )
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
         {this.renderMenu()}
      </ScrollView>

       









      </View>
    );
  }
}

const styles = {
  txt: {
    color: 'grey',
    fontSize: responsiveFontSize(2),
    fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light',
    marginLeft: 20,
  },
  lis: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: responsiveHeight(7)
  }
}