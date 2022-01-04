import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import ChatListItem from '../components/ChatListItem'

const Conversations = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Conversatii tata</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat room")}>
                <ChatListItem/>
                <ChatListItem/>
                <ChatListItem/>
                <ChatListItem/>
                <ChatListItem/>
            </TouchableOpacity>
        </View>
    )
}

export default Conversations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        alignContent:'center',
        backgroundColor: '#ADD8E6',


    }
})
