import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddChat from './AddChat';
import Map from './Map';
import Home from './Home';

const Tab = createBottomTabNavigator();
const TabStack = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen options={{}} name="Chat screen" component={AddChat} />
            <Tab.Screen options={{}} name="Map screen" component={Map} />
            <Tab.Screen options={{}} name="Home screen" component={Home} />
        </Tab.Navigator>

    );

}

export default TabStack

const styles = StyleSheet.create({})
