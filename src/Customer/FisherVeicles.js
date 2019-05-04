import React, { Component } from 'react';
import { FlatList, Image, View, Text ,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";


@inject("store")
@observer
export default class FisherVeicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vics: null
    };
  }

  componentDidMount() {
    axios.get('http://hootandhawat-001-site1.ftempurl.com/api/vehicles/all/user_id='+ this.props.store.userId, {

    })
      // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
      .then(Response => {

        
        if (Response.data.data != "No records") {

          this.setState({ vics: Response.data.vehicles, loading: false })
        }
        else {

          this.setState({ vics: null, loading: false })
        }

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </Button>

            <Button transparent onPress={() => Actions.addViecle()}>
              <Icon name='add' style={{ color: 'white' }} />
            </Button>

          </Left>
          <Body>
            <Title style={{ fontSize: responsiveFontSize(2.5) }}>{this.props.store.strings.vehicles}</Title>
          </Body>
          <Right>

            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: 'white' }} />
            </Button>

          </Right>
        </Header>

        <FlatList
          contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}
          keyExtractor={(item, index) => index.toString()}
          //refreshing = {this.state.refreshing}
          // onRefresh = {this.refresh}
          //onEndReached= {()=>{this.loadMore()}}
          onEndReachedThreshold={0.01}
          onScrollEndDrag={() => { this.setState({ isListScrolled: true }); }}
          data={this.state.vics}
          //ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item, index }) => (<Button style={{backgroundColor:'white',borderRadius:20,width:responsiveWidth(95),height:responsiveHeight(10),marginBottom:5,flexDirection:'column'}}>
            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(3)}}>{item.boat_name}</Text>
            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light', fontSize: responsiveFontSize(2)}}>{item.passengers_number} {this.props.store.strings.passenger}</Text>
          </Button>)}
        />
      </View>
    )
  }
}
