import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon, Input} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {Formik} from 'formik';
import * as yup from 'yup';

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const SignIn = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const SignInValidationSchema = yup.object({
    Username: yup.string().required('Required*'),
    Email: yup.string().required('Required*').email(),
    Password: yup.string().required('Required*'),
    Terms: yup.boolean().required('You Have to Agree The Terms'),
  });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <Container>
      <Formik
        initialValues={{
          Username: '',
          Email: '',
          Password: '',
          Terms: false,
        }}
        validationSchema={SignInValidationSchema}>
        {(formikprops) => (
          <View style={{width: '80%'}}>
            <H1>SIGN IN</H1>
            <Input
              selectionColor={'grey'}
              value={formikprops.values.Email}
              label="Email"
              caption="Make Sure You Provide Valid Email Address"
              onChangeText={formikprops.handleChange('Email')}
              keyboardType={'email-address'}
            />
            <Text style={{color: 'red'}}>{formikprops.errors.Email}</Text>
            <Input
              value={formikprops.values.Password}
              label="Password"
              caption="Should contain at least 8 symbols"
              accessoryRight={renderIcon}
              captionIcon={AlertIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={formikprops.handleChange('Password')}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'dodgerblue',
                width: '40%',
                alignItems: 'center',
                padding: 10,
                borderRadius: 100,
                marginLeft: '30%',
                marginTop: 20,
              }}>
              <Text style={{color: 'white'}}>Sign in</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.Text`
  font-size: 32px;
  margin-bottom: 20;
`;

export default SignIn;
