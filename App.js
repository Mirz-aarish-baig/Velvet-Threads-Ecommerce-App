import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/authContext';
import SplashScreen from './src/screens/splashScreen';
import WelcomeScreen from './src/screens/welcomeScreen';
import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/signUpScreen';
import HomeScreen from './src/screens/homeScreen';
import AddToCart from './src/screens/addToCart';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetails from './src/screens/productDetails';
import AddressScreen from './src/screens/AddressScreen';
import ShippingScreen from './src/screens/ShippingScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import CreditScreen from './src/screens/CreditScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={AddToCart}
              options={{ title: 'My Cart', headerShown: true }}
            />
            <Stack.Screen
              name="productDetails"
              component={ProductDetails}
              options={{ title: '', headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{ title: 'My Profile', headerShown: true }}
            />
            <Stack.Screen
              name="address"
              component={AddressScreen}
              options={{ title: 'Your Location', headerShown: true }}
            />

            <Stack.Screen
              name="shipping"
              component={ShippingScreen}
              options={{ title: 'Choose Shipping', headerShown: true }}
            />


            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: 'Payment Method', headerShown: true }}
            />

            <Stack.Screen
              name="Credit"
              component={CreditScreen}
              options={{ title: 'Credit Card', headerShown: true }}
            />
 

          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;

