import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput, TouchableOpacityBase,Keyboard, Image } from 'react-native'
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'

import { LinearGradient } from 'expo-linear-gradient';

import { ListItem, Avatar } from 'react-native-elements'
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
                .doc(makeid(15))
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
                .doc(makeid(16))
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
        setInput('')
        scrollViewRef.current.scrollToEnd({ animated: true })
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
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => 
            scrollViewRef.current.scrollToEnd({ animated: true })
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <ListItem containerStyle={{ backgroundColor: 'transparent', borderRadius: 30, marginTop: 25 }}>


                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', flexDirection: 'row', padding: 16, borderRadius: 30 }}>
                    <View style={{ flex: 8 }}>
                        <Text style={{ fontSize: 24, fontWeight: '500', textAlign: 'left', marginLeft: 75 }} >
                            {route.params.friendName}
                        </Text>
                    </View>
                </View>

                <Avatar
                    containerStyle={{ backgroundColor: '#202020', position: 'absolute', left: 14 }}
                    rounded
                    size={"large"}
                    source={{
                        uri: route.params.friendPhoto
                    }}
                />

            </ListItem>
            <KeyboardAvoidingView 
                
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}
            >
                <>
                    <ScrollView
                        style={{ top: -5 }}
                        ref={scrollViewRef}
                        onContentSizeChange={() =>
                            scrollViewRef.current.scrollToEnd({ animated: true })

                        }>
                        {messages.sort((x, y) => {
                            return x.data.timeStamp - y.data.timeStamp
                        }).map(({ id, data: { message, timeStamp, uid } }) =>
                            uid === temp ? (
                                <View key={makeid(12)} style={{
                                    backgroundColor: 'rgba(0, 185, 255, 0.25)',
                                    alignSelf: 'flex-end',
                                    borderBottomStartRadius: 15,
                                    borderTopLeftRadius: 15,
                                    borderBottomRightRadius: 15,
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                    paddingHorizontal: 10,
                                    alignContent: 'center',
                                    maxWidth: 250,
                                }}>
                                    <Avatar />
                                    <Text style={styles.reciver}>
                                        {message}
                                    </Text>
                                </View>
                            ) : (
                                <View key={makeid(12)} style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    alignSelf: 'flex-start',
                                    borderBottomStartRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                    paddingHorizontal: 10,
                                    alignContent: 'center',
                                    maxWidth: 250,
                                }}>
                                    <Avatar />
                                    <Text style={styles.transmiter}>
                                        {message}
                                    </Text>
                                </View>
                            )
                        )
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity>
                            <Image source={require('../Icons/photo.png')} style={{ height: 60, width: 60, marginLeft: -15, marginRight: -25, marginBottom: -15, marginTop: -15 }}></Image>
                        </TouchableOpacity>
                        <TextInput
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
        padding: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
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
        marginLeft: 25,

    },
    reciver: {
        alignSelf: 'flex-end',
        top: -17,
        marginVertical: -7

    },
    transmiter: {
        alignSelf: 'flex-start',
        top: -17,
        marginVertical: -7
    }
})
