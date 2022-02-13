import * as React from 'react';
//import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/utils/RegisterScreen';
//import DeleteScreen from './src/utils/DeleteScreen';
import Home from './src/screens/Home/Home';
import MusicSearch from './src/utils/MusicSearch';
import RegisterBarScreen from './src/utils/RegisterBarScreen';
import MapAmplify from './src/utils/MapAmplify';
import ForgotPassword from './src/utils/ForgotPassword'

import { Provider } from 'react-redux';
import store from './src/store/store';
import Footer from './src/utils/Footer';
import ProfileScreen from './src/utils/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ActionBarIcon from './src/utils/ActionBarIcon';


export default function App() {
  const Stack = createNativeStackNavigator();
  

  return (
    <Provider store={store} className="App">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          {/* <Stack.Screen name="DeleteScreen" component={DeleteScreen} /> */}
          <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerTitle: 'Home Activity', 
            headerLeft : props => <ActionBarIcon {...props} /> }}
           />
          <Stack.Screen name="MusicSearch" component={MusicSearch}  />
          <Stack.Screen
            name="RegisterBarScreen"
            component={RegisterBarScreen}
          />
          <Stack.Screen name="MapAmplify" component={MapAmplify} 
           options={{ headerTitle: 'Home Activity', 
           headerLeft : props => <ActionBarIcon {...props} /> }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>

  );
}
