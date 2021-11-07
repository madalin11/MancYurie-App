import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

const Register = ({ navigation }) => {
    return (
        <View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Firs Name"
                //value={}
                //onChangeText={}
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
                //value={}
                //onChangeText={}
                style={styles.input}
                />
                <TextInput
                    placeholder="Phone Number"
                //value={}
                //onChangeText={}
                style={styles.input}
                // secureTextEntry
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
                />

            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.replace("Home screen")}
                >
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.replace("Login screen")}
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
