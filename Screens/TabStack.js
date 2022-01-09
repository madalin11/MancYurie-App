import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddChat from './AddChat';
import Map from './Map';
import ChatRoom from './ChatRoom';
import Home from './Home';
import Conversations from './Conversations';
import UserProfile from './UserProfile';
import StackScreens from './StackScreens';
import AddFriend from './AddFriend';

const Tab = createBottomTabNavigator();
const TabStack = ({navigation}) => {
    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: '#D6F3F2', tabBarInactiveBackgroundColor: 'white' }}  >

            <Tab.Screen options={{}} name="Home screen" component={Home} />
            <Tab.Screen options={{}} name="Conversations" component={Conversations} />
            <Tab.Screen options={{}} name="Add Friend" component={AddFriend} />
            <Tab.Screen options={{}} name="Map screen" component={Map} />
            
            <Tab.Screen options={{}} name="Profile screen" component={StackScreens} />
        </Tab.Navigator>
       
    );

}

export default TabStack

const styles = StyleSheet.create({})
