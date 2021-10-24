import React,{useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddChat = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Add friend',
            headerBackTitle:"Chats",
        })
        
    }, [navigation])
    
    return (
        <View style={styles.container}>
            <Text>Chat room</Text>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({

})
