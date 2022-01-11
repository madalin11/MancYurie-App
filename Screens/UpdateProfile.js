import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';




const UpdateProfile = ({ navigation, route }) => {
    const temp = auth.currentUser.uid;
    const [photoUrl, setPhotoUrl] = useState('')
    const auth1 = auth.currentUser;

    function updatePhoto() {

        navigation.navigate('ImagePicker1', {
            id: 2
        })
    }
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    async function updateName1(name) {
        await auth1.updateProfile({
            displayName: name
        }).then(function () {

        }, function (error) {
            // An error happened.
        });
    }
    const [photo, setPhoto] = useState(auth.currentUser.photoURL);
    const [nume, setNume] = useState(auth.currentUser.displayName);
    const ref_input2 = useRef();
    useEffect(() => {
        const unsubscribe = db.collection("peoples").doc(temp).get().then((doc) => {
            setPhoto(doc.data().profilePhoto)
            setNume(doc.data().name)
        })
    }, [nume])


    async function updateName(name1) {
        await db.collection("peoples").doc(temp).update({ name: name1 })
        updateName1(name1);
        navigation.navigate('User Profile', { a: 1 })
    }

    const firstn = nume.split(" ")
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.button}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#ADD8E6', '#D6F3F2', 'white']}
                    style={styles.background}
                />
                <Text style={{ alignSelf: 'center', top: 85, fontSize: 24, color: '#3570EC', fontWeight: '500' }}>Edit profile </Text>
                <TouchableOpacity onPress={() => updatePhoto()} style={{ alignSelf: 'center', marginTop: 200, marginVertical: 20, marginHorizontal: 13 }}>
                    <Avatar
                        containerStyle={{ backgroundColor: '#202020' }}
                        rounded
                        size={120}
                        source={{ uri: photo || "https://www.pngfind.com/pngs/m/341-3415733_male-portrait-avatar-face-head-black-hair-shirt.png" }}
                    />
                    <View style={{ backgroundColor: 'white', position: 'absolute', borderRadius: 5, top: 90, left: 80, }}>
                        <Image style={{ height: 40, width: 40, margin: -2 }} source={require('../Icons/img.png')}>

                        </Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updatePhoto()}>
                    <Text style={{ color: '#3570EC', fontWeight: '500', alignSelf: 'center', marginBottom: 40 }}>Change profile picture</Text>
                </TouchableOpacity>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, marginHorizontal: 40 }}>
                            First Name
                        </Text>
                        <TextInput placeholder={firstn[0] || 'Name'}
                            style={{ marginTop: 10, top: -6 }}
                            onSubmitEditing={() => ref_input2.current.focus()}
                            onChangeText={text => setName(text)}
                        ></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, marginHorizontal: 40 }}>
                            Last Name
                        </Text>
                        <TextInput placeholder={firstn[1] || 'Name'}
                            style={{ top: 1 }}
                            ref={ref_input2}
                            onSubmitEditing={() => updateName(name + ' ' + lastName)}
                            onChangeText={text => setLastName(text)}
                        >
                        </TextInput>


                    </View>

                </View>


            </View>
        </TouchableWithoutFeedback>
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