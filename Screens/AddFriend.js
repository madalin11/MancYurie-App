import React from 'react'
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const AddFriend = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />

            <Text style={{ top: -175, marginBottom: 75, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                Find Friends
            </Text>
            <View style={{ width: '98%', paddingRight: 80, top: 40 }}>
                <TextInput
                    placeholder="Search by name"
                    type="text"
                    autoCapitalize="words"
                    //value={firstName}
                    //onChangeText={text => setFirstName(text)}
                    style={styles.input}>

                </TextInput>
            </View>
            <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 35,
                paddingVertical: 10.8,
                paddingLeft: 30,
                paddingRight: 20,
                borderRadius: 17,
                marginTop: 0,
                top: -281.5,
                left: 95,
            }}>
                <TouchableOpacity>
                    <Image source={require('../Icons/search.png')} style={{ width: 30, height: 30, }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        //backgroundColor: '#ADD8E6',


    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 17,
        marginTop: 7,
        width: '83%',
        alignSelf: 'center',
        fontSize: 18,
        top: -270,
        left: 15,

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
