import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatRoom = () => {
    const [input, setInput] = useState('');
    const sendMessage = () => { }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Message"
                            style={styles.textInput}
                        />
                        <TouchableOpacity onPress={sendMessage} >
                            <Ionicons name="send" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
        

    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,

        borderColor: "#202020",
        borderWidth: 10,
        backgroundColor: "#202020",
        color: "gray",
        borderRadius: 30,
    }
})
