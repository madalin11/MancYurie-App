
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'

import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react'

import { auth ,db} from '../firebase'



const Register = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetePassword, setRepetePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
   
    function checkTextInput() {
        //Check for the Name TextInput
        if (!firstName.trim()) {
            alert('Please Enter First Name');
            return;
        }
        if (!phoneNumber.trim()) {
            alert('Please Enter Phone Number');
            return;
        }
        if (!lastName.trim()) {
            alert('Please Enter Last Name');
            return;
        }
        if (repetePassword.trim() !== password.trim()) {
            alert('Password does\'t match');
            return;
        }

        return true;
    };
  async function createPeople(temp){
        await db.collection("peoples").doc(temp).set({
            coord:"37.78825,-122.4324"
        }).then(()=>{
            console.log("merge");
        }).catch((error)=>alert(error));
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {

                navigation.replace("Tab Stack")
            }
        })

        return unsubscribe
    }, [])
    const handleSignUp = () => {
        if (checkTextInput() == true) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    const auth1 = authUser.user;
                    console.log(auth1.displayName)
                    // Updates the user attributes:
                    const fullName = firstName + " " + lastName;
                    auth1.updateProfile({


                        displayName: fullName,
                        photoURL:photoUrl || "https://favpng.com/png_view/avatar-user-profile-icon-design-png/eg0SZK0T"
            

                    }).then(function () {
                        // Profile updated successfully!
                        //createPeople();
                        //temp=auth1.uid;
                        console.log(auth1.uid)
                       createPeople(auth1.uid);
                    }, function (error) {
                        // An error happened.
                    });
                })
                .catch(error => alert(error.message))
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}

            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
        >
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <ScrollView>
                <View style={{ marginTop: 50 }}>

                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity
                            raised onPress={() => navigation.reset({ index: 0, routes: [{ name: "Login screen" }] })}
                        >
                            <Image source={require('../Icons/leftarrow.png')} style={{ marginTop: 20, marginLeft: 10, width: 20, height: 20, marginBottom: 20 }}></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginBottom: 75, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                        Register
                    </Text>
                    <TextInput
                        placeholder="First Name"
                        type="text"
                        autoCapitalize="words"
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Last Name"
                        type="text"
                        autoCapitalize="words"
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        style={styles.input}
                    // secureTextEntry
                    />
                    <TextInput
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        keyboardType="email-address"

                    />

                    <TextInput
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        style={styles.input}
                        keyboardType="numeric"

                    />
                    <TextInput
                        placeholder="Photo URL (optional)"
                        value={photoUrl}
                        onChangeText={text => setPhotoUrl(text)}
                        style={styles.input}


                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Repete Password"
                        value={repetePassword}
                        onChangeText={text => setRepetePassword(text)}
                        style={styles.input}
                        secureTextEntry
                        onSubmitEditing={handleSignUp}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity

                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        <Text style={styles.buttonOutlineText}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 7,
        width: '80%',
        alignSelf: 'center'


    },
    container: {
        flex: 1,
        //alignContent:'center',
        backgroundColor: '#ADD8E6',


    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    },
    button: {
        backgroundColor: 'white',
        width: '90%',
        padding: 11,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#202020',
        borderWidth: 2,


    },
    buttonContainer: {
        width: '100%',
        paddingLeft: 70,
        paddingRight: 70,
        alignSelf: 'center',
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,

    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 20,
        borderColor: '#202020',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 16,
    },
})
