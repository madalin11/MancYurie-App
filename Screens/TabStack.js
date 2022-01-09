import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacityBase } from 'react-native'
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
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

const TabStack = ({navigation}) => {

    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveBackgroundColor: 'white' }}  >


            <Tab.Screen name="Home screen" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                        <Image
                            source={require('../Icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Conversations" component={Conversations} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                        <Image
                            source={require('../Icons/chats.png')}
                            resizeMode='contain'
                            style={{
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                ),
            }} />
            <Tab.Screen options={{}} name="Add Friend" component={AddFriend} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: -16 }}>
                        <Image
                            source={require('../Icons/addfriend.png')}
                            resizeMode='contain'
                            style={{
                                width: 90,
                                height: 90,
                            }}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Map screen" component={Map} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                        <Image
                            source={require('../Icons/location.png')}
                            resizeMode='contain'
                            style={{
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Profile screen" component={StackScreens} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                        <Image
                            source={require('../Icons/profile.png')}
                            resizeMode='contain'
                            style={{
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                ),
            }} />

        </Tab.Navigator>
       
    );

}

export default TabStack

const styles = StyleSheet.create({})
