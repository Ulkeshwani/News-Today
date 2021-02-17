import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

class Splash extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <LottieView
          source={require('../../../assets/SplashLoading.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => this.props.navigation.replace('SignIn')}
        />
        <Text
          style={{
            fontSize: 32,
            marginLeft: '30%',
            marginTop: '25%',
          }}>
          News Today
        </Text>
      </View>
    );
  }
}

export default Splash;
