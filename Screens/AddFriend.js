import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddFriend = () => {
    return (
        <View style={styles.container}>
            <Text>Saluut</Text>
        </View>
    )
}

export default AddFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: '#ADD8E6',


    }
})
