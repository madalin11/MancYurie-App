import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const Register = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={()=>navigation.replace("Home screen")}
            >
                <Text>
                    Register 
                </Text>
            </TouchableOpacity>
            <Text></Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})
