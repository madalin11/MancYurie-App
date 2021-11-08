import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { auth } from '../firebase'


import { getAuth, updateProfile } from "firebase/auth"

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetePassword, setRepetePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNuber, setPhoneNumber] = useState('');

    function checkTextInput() {
        //Check for the Name TextInput
        if (!firstName.trim()) {
            alert('Please Enter First Name');
            return;
        }
        if(repetePassword.trim()!==password.trim()){
            alert('Password does\'t match');
            return;
        }

        return true;
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {

                navigation.replace("Home screen")
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

                        displayName: "Jane Q. User",
                        photoURL: "https://favpng.com/png_view/avatar-user-profile-icon-design-png/eg0SZK0T"
                    }).then(function () {
                        // Profile updated successfully!

                        console.log(auth1.displayName)

                    }, function (error) {
                        // An error happened.
                    });
                })
                .catch(error => alert(error.message))
        }
    }

    return (
        <View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Firs Name"
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
                    value={phoneNuber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={styles.input}
                    keyboardType="numeric"

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
                    onChangeText={text=>setRepetePassword(text)}
                    style={styles.input}
                    secureTextEntry
                    onSubmitEditing={handleSignUp}
                />

            </View>
            <View>
                <TouchableOpacity

                    onPress={handleSignUp}
                >
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    raised onPress={() => navigation.replace("Login screen")}
                >
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <Text></Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    }
})
