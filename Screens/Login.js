import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Image, Platform } from 'react-native'



const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}

                behavior={Platform.OS==='ios' ? 'padding':'height'}
            >
            <View style={{height: 100}}/>
            <View>
                <Image style={{ width: 100, height: 100, marginTop: 50, marginBottom: 100, alignContent: 'center' }} source={require('../Icons/chat.png')} />
            </View>
            <View style={styles.inputContainer}>

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
                    onChangeText={text => setpassword(text)}
                    style={styles.input}
                    secureTextEntry
                />

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.button}

                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home screen")}
                    style={[styles.button, styles.buttonOutline]}

                >
                    <Text styles={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
                <View style={{height:100}}/>
            </View>

        </KeyboardAvoidingView>
        </TouchableWithoutFeedback >
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ADD8E6',
        
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#202020',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',



    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 20,
        borderColor: '#202020',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
