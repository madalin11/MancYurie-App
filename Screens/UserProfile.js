import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
const UserProfile = ({ navigation }) => {

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login screen' }],
                });
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.button}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <TouchableOpacity onPress={handleSignOut}>
                <Text>
                    Iesi afara
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Update Profile")}>
                <Text>
                    Settings
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ffc0c0'

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
