import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar, Card, IconButton, Subheading} from 'react-native-paper';
import {GoogleSignin} from '@react-native-community/google-signin';

const Profile = () => {
  const [photo, setPhoto] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      user: {photo, name, email},
    } = await GoogleSignin.getCurrentUser();
    setPhoto(photo);
    setName(name);
    setEmail(email);
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userRow}>
        <Avatar.Image size={100} source={{uri: `${photo}`}} />
        <View style={styles.userNameRow}>
          <Text style={styles.userNameText}>{name}</Text>
        </View>
        <View style={styles.userBioRow}>
          <Text style={styles.userBioText}>{email}</Text>
        </View>
      </View>
      <View style={styles.socialRow}>
        <View style={styles.socialIcon}>
          <IconButton
            size={30}
            icon="google"
            onPress={() => console.log('twitter')}
          />
        </View>
        <View style={styles.socialIcon}>
          <IconButton
            size={30}
            icon="facebook"
            onPress={() => console.log('twitter')}
          />
        </View>
        <View style={styles.socialIcon}>
          <IconButton
            size={30}
            icon="github"
            onPress={() => console.log('twitter')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
    color: 'black',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
    marginTop: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 30,
  },
});

export default Profile;
