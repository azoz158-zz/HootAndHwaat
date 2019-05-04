import React, { Component } from 'react';
import { ImageBackground, Image, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground source={require('../assets/imgs/3.png')} style={{ width: '100%', height: '100%' }}>
        <Animatable.Image useNativeDriver animation="fadeInUp" duration={2000} resizeMode='contain' source={require('../assets/imgs/1.png')} style={{ height: '20%', alignSelf: 'center', marginTop: 30 }} />
        <Animatable.Image useNativeDriver resizeMode='contain' animation="fadeIn" delay={1500} source={require('../assets/imgs/2.png')} style={{ height: '10%', alignSelf: 'center' }} onAnimationEnd={() => { Actions.selectionScreen()}} />
      </ImageBackground>
    );
  }
}
