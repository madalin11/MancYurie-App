import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'


import { getAuth, updateProfile } from "firebase/auth"

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home screen")
            }
        })

        return unsubscribe
    }, [])
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                const auth1 = authUser.user;
                console.log(auth1.displayName)
                // Updates the user attributes:
                auth1.updateProfile({
                    displayName: "Jane Q. User",
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(function () {
                    // Profile updated successfully!
                    console.log(auth1.displayName)

                }, function (error) {
                    // An error happened.
                });
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Firs Name"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Last Name"
                    //value={}
                    //onChangeText={}
                    style={styles.input}
                // secureTextEntry
                />
                <TextInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                    placeholder="Password"
                    //value={}
                    //onChangeText={}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Repete Password"
                    //value={}
                    //onChangeText={}
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
