import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuth } from '../context/authContext';

const SplashScreen = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {

    setTimeout(() => {
      if (user) {

        navigation.replace('Home');
      } else {

        navigation.replace('Welcome');
      }
    }, 3000);
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5c311c',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
