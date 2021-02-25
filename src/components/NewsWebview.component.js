import React, {Component} from 'react';
import {Alert} from 'react-native';
import WebView from 'react-native-webview';

export default NewsWebview = ({route, navigation}) => {
  const {NewsUrl, title} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: `Article: ${title}`,
      },
      [navigation],
    );
  });

  return (
    <WebView
      source={{uri: `${NewsUrl}`}}
      onError={(Event) =>
        Alert.alert(`Error: ${Event.nativeEvent.description}`)
      }
    />
  );
};
