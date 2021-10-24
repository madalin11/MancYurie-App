import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, KeyboardAvoidingViewBase, KeyboardAvoidingViewComponent, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './Screens/Home';
import Login from './Screens/Login';
import Register from './Screens/Register';
import AddChat from './Screens/AddChat';
import Map from './Screens/Map';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen options={{ headerShown: false }} name="Login screen" component={Login} />
        <Stack.Screen options={{  }} name="Register screen" component={Register} />
       <Stack.Screen options={{  }} name="Chat screen" component={AddChat} />
        <Stack.Screen options={{  }} name="Map screen" component={Map} />
        <Stack.Screen options={{  }} name="Home screen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

