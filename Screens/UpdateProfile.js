import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';



const UpdateProfile = ({ navigation }) => {
    const temp = auth.currentUser.uid;
    const [photoUrl, setPhotoUrl] = useState('')
    const auth1 = auth.currentUser;
    async function updatePhoto() {
        await auth1.updateProfile({
            photoURL: photoUrl || "https://www.pngfind.com/pngs/m/341-3415733_male-portrait-avatar-face-head-black-hair-shirt.png"
        }).then(function () {

        }, function (error) {
            // An error happened.
        });
        navigation.navigate('User Profile', {
            id: 1
        })
    }
    const [name, setName] = useState('')
    async function updateName() {
        await auth1.updateProfile({
            displayName: name
        }).then(function () {

        }, function (error) {
            // An error happened.
        });
    }
    return (
        <View style={styles.button}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 200, marginVertical: 50, marginHorizontal: 13 }}>
                <Avatar
                    containerStyle={{ backgroundColor: '#202020' }}
                    rounded
                    size={120}
                    source={{ uri: "https://www.pngfind.com/pngs/m/341-3415733_male-portrait-avatar-face-head-black-hair-shirt.png" }}
                />
                <View style={{ backgroundColor: 'white', position: 'absolute', borderRadius: 5, top: 90, left: 80, }}>
                    <Image style={{ height: 40, width: 40, margin: -2 }} source={require('../Icons/img.png')}>

                    </Image>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <View style={{}}>
                    <Text style={{ marginHorizontal: 40 }}>
                        Name
                    </Text>
                </View>
                <TextInput placeholder={auth.currentUser.displayName || 'Name'}>

                </TextInput>
            </View>
            <Text onPress={() => updatePhoto()} >Here u change ur photo profile </Text>
        </View>
    )
}


export default UpdateProfile

const styles = StyleSheet.create({
    button: {
        width: '100%',

        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#ffc0c0'

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})