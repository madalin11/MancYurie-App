import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import ChatListItem from '../components/ChatListItem'
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebase';


const Conversations = ({ navigation }) => {
    const [textSearch, setTextSearch] = useState('')
    const [friends, setFriends] = useState([])
    const temp = auth.currentUser.uid;
    const [friendsAdd, setFriendsAdd] = useState([])


    const enterChat = (id, friendName, friendPhoto) => {
        navigation.navigate('Chat room', {
            id: id,
            friendName: friendName,
            friendPhoto: friendPhoto
        });
    }
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("friends").onSnapshot(snapshot => {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
                setFriends(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                console.log(friends)
            })
        return unsubscribe;
    }, [navigation])
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .onSnapshot(snapshot => {
                setFriendsAdd(
                    snapshot.docs.filter((doc) => {
                        let t = false;
                        friends.forEach(element => {
                            if ((element.id == doc.id) && (element.data.haveChats == true))
                                t = true;
                        });
                        return t;
                    }
                    ).map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                // setSearchabelFriends(friendsToAdd);
            }

            )

        return unsubscribe;
    }, [friends])


    const [lastElement, setLastElement] = useState('');

    // function findLastMessage(id) {

    //     db
    //         .collection("peoples")
    //         .doc(temp)
    //         .collection("friends")
    //         .doc(id)
    //         .collection("messages")
    //         .onSnapshot((snapshot) => setMessages1(
    //             snapshot.docs.map(doc => ({
    //                 id: doc.id,
    //                 data: doc.data()
    //             }))
    //         ))
    //     messages1.sort((x, y) => {
    //         return x.data.timeStamp - y.data.timeStamp
    //     })
    //     setLastElement(messages1[messages1.length - 1])

    //     return lastElement;
    // }

    function filterZZZ(friend) {
        try {
            if (friend.data.name == '') {
                return true;
            }
            try {

                if (friend.data.name.toLowerCase().includes(textSearch.toLowerCase()))
                    return true;

            } catch (err) {

            }
            return false
        } catch (err) {

        }
        return true
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />

            <View style={{ flexDirection: 'column', marginTop: 85 }}>
                <Text style={{ fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                    Conversations
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Add chat")} style={{ alignSelf: 'flex-end', marginRight: 20, top: -23 }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../Icons/newchat.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 40, marginTop: 10 }}>

                <TextInput

                    onChangeText={(text) => setTextSearch(text)}
                    placeholder='Search' style={{ fontSize: 18, backgroundColor: 'white', height: 45, marginBottom: 1, paddingLeft: 55, marginHorizontal: 35, marginTop: 0, borderRadius: 19 }}
                >

                </TextInput>

                <TouchableOpacity style={{ position: 'absolute' }} onPress={Keyboard.dismiss}>
                    <Image source={require('../Icons/search.png')} style={{ top: 8, left: 49, width: 30, height: 30, }}></Image>
                </TouchableOpacity>

            </View>



            <ScrollView style={{ height: '100%' }}>
                {
                    friendsAdd.filter(filterZZZ).map(({ id, data: { name, profilePhoto } }) => (
                        <ChatListItem key={id} enterChat={enterChat} friendName={name} id={id} friendPhoto={profilePhoto} />
                    ))
                }
            </ScrollView>


        </View>
    )
}

export default Conversations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // //alignItems: 'center',
        alignContent: 'center',
        // backgroundColor: '#ADD8E6',


    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
