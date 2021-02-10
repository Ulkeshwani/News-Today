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
          backgroundColor: 'white',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <LottieView
          source={require('../../../assets/splashAnimation.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => this.props.navigation.replace('SignIn')}
        />
      </View>
    );
  }
}

export default Splash;
