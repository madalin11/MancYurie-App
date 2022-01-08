import React, { useLayoutEffect, useState,useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput } from 'react-native'
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { db, auth } from '../firebase'

const ChatRoom = ({ navigation, route }) => {
    const temp = auth.currentUser.uid;
    const current = route.params.id;
    const [input, setInput] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: 'row',

                        alignItems: 'center'
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: route.params.friendPhoto
                        }}
                    />
                    <Text>
                        {route.params.friendName}
                    </Text>

                </View>
            ),
            headerLeft: () => {
                <TouchableOpacity>

                </TouchableOpacity>
            }
        })

    }, [navigation, route])
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("friends")
            .doc(current)
            .collection("messages")
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
        return unsubscribe;
    }, [route])
    async function sendMessage(id) {
        if (checkTextInput()) {
            await db
                .collection("peoples")
                .doc(temp).collection("friends")
                .doc(id)
                .collection("messages")
                .doc(makeid(6))
                .set({
                    message: input,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: temp
                })
                .then(() => {
                    console.log("merge1");
                })
                .catch((error) => alert(error));

            await db
                .collection("peoples")
                .doc(id).collection("friends")
                .doc(temp)
                .collection("messages")
                .doc(makeid(7))
                .set({
                    message: input,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: temp
                })
                .then(() => {
                    console.log("merge2");
                })
                .catch((error) => alert(error));
        }
    }
    function checkTextInput() {
        //Check for the Name TextInput
        if (!input.trim()) {
            return false;
        }
        return true;
    }
    function formatDate(date) {
        var year = date.getFullYear(),
            month = date.getMonth() + 1, // months are zero indexed
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? "0" + minute : minute,
            morning = hour < 12 ? "am" : "pm";

        return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
    }
    const scrollViewRef = useRef();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : undefined}
            >
                <>
                    <ScrollView 
                    ref={scrollViewRef}
                    onContentSizeChange={()=>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                    
                    }>
                        {messages.sort((x,y)=>{
                            return x.data.timeStamp-y.data.timeStamp
                        }).map(({ id, data: { message, timeStamp, uid } }) =>
                            uid === temp ? (
                                <View>
                                    <Avatar />
                                    <Text style={styles.reciver}>
                                        {message}
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Avatar/>
                                    <Text style={styles.transmiter}>
                                        {message}
                                    </Text>
                                </View>
                            )
                        )
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput style={{ color: "red" }}
                            value={input}
                            onSubmitEditing={() => setInput('')}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Message"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                        />
                        <TouchableOpacity onPress={() => sendMessage(current)} >
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
        paddingLeft: 15,
        backgroundColor: "#202020",
        color: "white",
        borderRadius: 30,
    },
    reciver:{
        alignSelf:'flex-end'
    },
    transmiter:{
        alignSelf:'flex-start'
    }
})
