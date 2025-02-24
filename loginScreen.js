import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,Image, ActivityIndicator } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; 


const LoginScreen = () => {
  
  const navigation = useNavigation();
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);  

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error: ", error.message);
      alert(error.message); 
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
        <Image
        source={require('../../assets/1.png')} 
        style={styles.welcomeImage}
      />
    
      <Text style={styles.heading}>Login to Velvet Threads</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

     
     
{loading ? (
        <ActivityIndicator size="large" color="white" /> 
      ) : (
        <Button title="Login" onPress={handleLogin} color="grey" />
      )}

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5c311c',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    LoginButton :{

    },
    heading: {
      fontSize: 32,
      color: 'white',
      marginBottom: 30,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
    formContainer: {
      width: '90%',
      backgroundColor: 'white', 
      borderRadius: 12,
      padding: 20,
      borderWidth: 2,
      borderColor: '#5c311c', 
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, 
    },
    input: {
      width: '80%',
      height: 45,
      backgroundColor: 'gainsboro', 
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ddd', 
    },
    button: {
      width: '100%',
      height: 45,
      backgroundColor: '#5c311c', 
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signupText: {
      color: 'white',
      marginTop: 20,
      fontSize: 16,
      textAlign: 'center', 
    },
    signupLink: {
      color: 'white',
      fontWeight: 'bold',
      textDecorationLine: 'underline', 

    },
    welcomeImage: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      marginBottom: 30,
      borderRadius: 20,
      borderWidth: 5,
      borderColor: 'grey',
    },
  });
  

export default LoginScreen;
