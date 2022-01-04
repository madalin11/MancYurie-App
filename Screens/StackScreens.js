import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';

const Stack = createNativeStackNavigator();
const StackScreens = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="User Profile" component={UserProfile}/>
            <Stack.Screen name="Update Profile" component={UpdateProfile}/>
        </Stack.Navigator>
    )
}

export default StackScreens

const styles = StyleSheet.create({})
