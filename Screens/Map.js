import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Map = () => {
    return (
        <View style={styles.container}>
            <Text>Map option</Text>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: '#ADD8E6',


    }
})
