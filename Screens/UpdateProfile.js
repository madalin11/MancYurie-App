import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UpdateProfile = () => {
    return (
        <View style={styles.button}>
            <Text>Here u change ur photo profile </Text>
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc0c0'

    }
})
