import React from 'react'
import { getAuth } from "firebase/auth"

import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase';
import { updateProfile } from "firebase/auth";
import NotificationListItem from '../components/NotificationListItem';
import StoryItem from '../components/StoryItem';

const Tab = createBottomTabNavigator();




const Home = ({ navigation }) => {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login screen")
            })
            .catch(error => alert(error.message))
    }
    const updateUSER = () => {

        const auth1 = auth.currentUser;
        console.log(auth1.displayName)
        // Updates the user attributes:
        auth1.updateProfile({
            displayName: "Jane Q. User"
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated successfully!
            console.log(auth1.uid)

        })
            .catch(error => alert(error.message));

    }
    return (

        <SafeAreaView style={styles.button}>
            <Text style={styles.text}>
                Hello,
            </Text>
            <Text style={styles.text1}>
                Andrei
            </Text>
            <Text style={{ color: 'white', paddingLeft: 15, marginTop: 15 }}>
                Your Featured Stories
            </Text>
            <ScrollView horizontal={true} backgroundColor={"#202020"}  >
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
            </ScrollView>

            <ScrollView style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={()=>navigation.navigate("Map screen")}>
                    <NotificationListItem/>
                </TouchableOpacity>

                <NotificationListItem />
                <NotificationListItem />
                <NotificationListItem />
                <NotificationListItem />
                <NotificationListItem />
                <NotificationListItem />
                <NotificationListItem />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home
const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#202020',


    },
    text: {
        paddingTop: 15,
        color: '#777777',
        paddingLeft: 15,
        fontSize: 30
    },
    text1: {
        color: 'white',
        paddingLeft: 15,
        fontSize: 40
    },
    container: {
        padding: 15,
        backgroundColor: '#202020',
        borderRadius: 10,

        marginTop: 10,


        alignItems: 'center'
    }

})
