import React from 'react'
import { getAuth } from "firebase/auth"

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase';
import { updateProfile } from "firebase/auth";

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
        }).then(()=>{
            // Profile updated successfully!
            console.log(auth1.uid)
           
        })
        .catch (error => alert(error.message));

    }
    return (

        <View style={styles.button}>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.container}

            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 45 }}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat screen")}>
                <Text>
                    Add friend
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.map}
                onPress={updateUSER}>
                <Text>
                    Check this map
                </Text>
            </TouchableOpacity>

        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc0c0'

    },
    container: {
        padding: 15,
        backgroundColor: '#202020',
        borderRadius: 10,
        width: '60%',
        paddingVertical: 15,
        marginHorizontal: 10,

        alignItems: 'center'
    }

})
