import React from 'react';
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
import NewsWebview from './components/NewsWebview.component';
import {firebaseConfig} from './E2E/Google Auth Provider/config';

import * as firebase from 'firebase';
import {Alert} from 'react-native';
import Signup from './Screens/Signup/Signup.screen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.default.initializeApp(firebaseConfig);
} else {
  firebase.default.app(); // if already initialized, use that one
}

const App = () => {
  const [IsAuthedUser, setAuthedUser] = React.useState(null);

  React.useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthedUser(user);
      } else {
        setAuthedUser(null);
      }
    });
    console.log('Checked Login');
  };

  const signOut = async () => {
    await firebase.default
      .auth()
      .signOut()
      .then(async () => {
        await Alert.alert('Success', 'Logged Out Successfully');
        setAuthedUser(false);
      });
  };

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Daily News',
            headerRight: () => (
              <MaterialCommunityIcons
                name="account-arrow-right-outline"
                size={24}
                color="dodgerblue"
                style={{paddingRight: 10}}
                onPress={signOut}
              />
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                name="newspaper-variant"
                size={24}
                color="dodgerblue"
                style={{paddingLeft: 10}}
              />
            ),
          }}
        />
        <HomeStack.Screen name="Article" component={NewsWebview} />
      </HomeStack.Navigator>
    );
  }

  return !IsAuthedUser ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{title: 'Welcome Back!'}}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Sign-Up" component={Signup} />
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
          name="Home Screen"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#009387',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="newspaper-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarColor: '#1f65ff',
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
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
