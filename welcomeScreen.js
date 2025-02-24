import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
   
      <Image
        source={require('../../assets/splash.png')} 
        style={styles.welcomeImage}
      />
    
      <Text style={styles.text}>Welcome to Velvet Threads!</Text>


      <View style={styles.buttons}>
        <Button
          title="Login"
          color="#5c311c"
          onPress={() => navigation.navigate('Login')}
        />
        
        <Text></Text>
        <Button
          title="Sign Up"
          color="#5c311c"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    
    padding: 20,
  },
  welcomeImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#5c311c',
  },
  text: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    width: '80%',
   
    
  },
  
});

export default WelcomeScreen;
