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
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : undefined}
            >
                <>
                    <ScrollView>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput style={{color:"red"}}
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Message"
                            placeholderTextColor="#707070"
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
        paddingLeft:15,
        backgroundColor: "#202020",
        color: "white",
        borderRadius: 30,
    }
})
