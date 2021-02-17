import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import * as animationData from '../../assets/410-lego-loader.json';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LottieView
        source={animationData}
        autoPlay
        loop
        style={{backgroundColor: 'white'}}
      />
    );
  }
}
