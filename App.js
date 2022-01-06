import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, KeyboardAvoidingViewBase, KeyboardAvoidingViewComponent, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Login from './Screens/Login';
import Register from './Screens/Register';

import ChatRoom from './Screens/ChatRoom';
import TabStack from './Screens/TabStack';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer backgroundColor={'red'}>
      <Stack.Navigator>
      
        <Stack.Screen options={{ headerShown: false }} name="Login screen" component={Login} />
        <Stack.Screen options={{  }} name="Register screen" component={Register} />
        <Stack.Screen options={{  }} name="Chat room" component={ChatRoom} />
        <Stack.Screen options={{ headerShown: false }} name="Tab Stack" component={TabStack} />
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

