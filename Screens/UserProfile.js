import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import NotificationListItem from '../components/NotificationListItem';

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

            <Text style={{ top: -87, marginBottom: 75, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                Profile
            </Text>

            <View style={{ top: -205, left: -150 }}>
                <TouchableOpacity raised onPress={handleSignOut}>
                    <Image source={require('../Icons/logout.png')} style={{ marginTop: 20, marginLeft: 10, width: 20, height: 20, marginBottom: 20 }} />
                </TouchableOpacity>
            </View>

            <View style={{ top: -284, left: 150 }}>
                <TouchableOpacity raised onPress={() => navigation.navigate("Update Profile")}>
                    <Image source={require('../Icons/settings.png')} style={{ marginTop: 20, marginLeft: 10, width: 60, height: 60, marginBottom: 20 }} />
                </TouchableOpacity>
            </View>

            <View>
                <Image
                    source={require('../Icons/cat.png')}
                    style={{ height: 110, width: 110, position: 'absolute', bottom: 290, alignSelf: 'center', borderRadius: 60 }}
                />
                <Text style={{ fontWeight: '500', fontSize: 22, top: -160, textAlign: 'center' }}>
                    Catalin Jidoi
                </Text>
                <Text style={{ fontWeight: '300', fontSize: 16, top: -160, textAlign: 'center' }}>
                    @catalinj2
                </Text>
                <Text style={{ fontWeight: '300', fontSize: 16, top: -130, left: -80 }}>
                    Friends
                </Text>
                <Text style={{ fontWeight: '300', fontSize: 16, top: -148, left: 150, }}>
                    Posts
                </Text>
                <Text style={{ fontWeight: '700', fontSize: 16, top: -140, left: -75 }}>
                    1552
                </Text>
                <Text style={{ fontWeight: '700', fontSize: 16, top: -158, left: 160, }}>
                    35
                </Text>

            </View>

        </View >
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
