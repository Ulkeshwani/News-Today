import React, {Component} from 'react';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Screens/Home/Home.Screen';
import Profile from './Screens/Profile/Profile.screen';
import Splash from './Screens/splash Screen/splash.screen';
import SignIn from './Screens/Sign In/SignIn.screen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [IsAuthedUser, setAuthedUser] = React.useState(true);

  return !IsAuthedUser ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        inactiveColor="black"
        barStyle={{
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: 'dodgerblue',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'News Today',
            tabBarColor: '#009387',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="newspaper"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={Profile}
          options={{
            tabBarColor: '#1f65ff',
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
  </>
);
