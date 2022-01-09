import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ChatListItem from '../components/ChatListItem'
import { LinearGradient } from 'expo-linear-gradient';

const Conversations = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <Text style={{ top: -62, marginBottom: 75, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                Conversations
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat room")}>
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
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
        alignContent: 'center',
        //backgroundColor: '#ADD8E6',


    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
