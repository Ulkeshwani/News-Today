import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Icon, Input, CheckBox} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import * as firebase from 'firebase';

import Loading from '../../components/Loading.component';

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const SignIn = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [check, setCheck] = React.useState(false);
  const [TextCursorColor] = React.useState('blue');
  const [isLoading, setLoading] = React.useState(false);
  // const [user, setUser] = React.useState(false);

  const SignInValidationSchema = yup.object({
    Email: yup.string().required('Required*').email(),
    Password: yup.string().required('Required*').min(8),
  });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '860162144476-achn234os1o7hioi5pp3rp01omklfa0a.apps.googleusercontent.com',
      });
      setCheck(!check);
      const data = await GoogleSignin.signIn();
      const credential = firebase.default.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      const firebaseCredential = await firebase.default
        .auth()
        .signInWithCredential(credential);
      if (firebaseCredential) {
        //do Something
      }
      if (typeof success === 'function') success();
    } catch (e) {
      setCheck(false);
      console.warn('GOOGLE ERROR', e);
      if (typeof cancel == 'function') cancel();
    }
  };

  return (
    <View style={styles.Container}>
      <ScrollView>
        <Formik
          initialValues={{
            Email: '',
            Password: '',
          }}
          validationSchema={SignInValidationSchema}
          onSubmit={(values, action) => {
            action.resetForm();
            const {Email, Password} = values;
            try {
              firebase.default
                .auth()
                .signInWithEmailAndPassword(Email, Password)
                .then((callback) => {
                  navigation.replace('Home', {user: callback});
                  console.log(callback);
                });
            } catch (e) {
              Alert.alert(`Auth Error ${e}`);
            }
          }}>
          {(formikprops) => (
            <TouchableWithoutFeedback
              style={{
                flex: 0.9,
                width: 320,
                marginTop: '40%',
              }}
              onPress={Keyboard.dismiss}>
              <Text style={styles.H1}>News Today</Text>
              <Input
                selectionColor={TextCursorColor}
                value={formikprops.values.Email}
                label="Email"
                caption={
                  <Text style={{color: 'red'}}>{formikprops.errors.Email}</Text>
                }
                onChangeText={formikprops.handleChange('Email')}
                keyboardType={'email-address'}
              />

              <Input
                selectionColor={TextCursorColor}
                value={formikprops.values.Password}
                label="Password"
                caption={
                  <Text style={{color: 'red'}}>
                    {formikprops.errors.Password}
                  </Text>
                }
                accessoryRight={renderIcon}
                captionIcon={AlertIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={formikprops.handleChange('Password')}
              />
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 100,
                      marginTop: 20,
                    }}
                    disabled={check}
                    onPress={() => formikprops.handleSubmit()}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      {!check ? 'Agree terms To Proceed' : 'SIGN IN'}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    style={{marginTop: 10}}
                    mode="text"
                    color="black"
                    onPress={() => navigation.navigate('Sign-Up')}>
                    Don't Have account? ¯\_(ツ)_/¯
                  </Button>
                </>
              )}
            </TouchableWithoutFeedback>
          )}
        </Formik>
      </ScrollView>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => signInWithGoogle()}
      />
      <Text style={{bottom: 10}}>Made With ❤ 2021</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  H1: {
    fontSize: 32,
    marginBottom: 20,
  },
  signInButton: {
    bottom: 50,
  },
});

export default SignIn;
