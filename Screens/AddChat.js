import React, { useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import { auth, db } from '../firebase'
import FriendListItem from '../components/FriendListItem';
import * as firebase from "firebase";

const AddChat = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add friend',
            headerBackTitle: "Chats",
        })

    }, [navigation])
    const temp = auth.currentUser.uid;
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("friends").onSnapshot(snapshot => {
                setFriends(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            })
        return unsubscribe;
    }, [])
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
    const [textSearch, setSearchText] = useState('')
    const [friendsToAdd, setFriendsToAdd] = useState([])
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .onSnapshot(snapshot => {
                setFriendsToAdd(
                    snapshot.docs.filter((doc) => {
                        let t = false;
                        friends.forEach(element => {

                            if ((element.id == doc.id) && (element.data.haveChats == false))
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
    async function addConversation(id) {
        await db
            .collection("peoples")
            .doc(temp).collection("friends")
            .doc(id)
            .collection("messages")
            .doc(makeid(6))
            .set({
                message: "Bine ai venit",
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
                message: "Bine ai venit",
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: temp
            })
            .then(() => {
                console.log("merge2");
            })
            .catch((error) => alert(error));

        await db.collection("peoples").doc(temp).collection("friends").doc(id).set({
            haveChats: true
        })

            .then(() => {
                console.log("merge3");
            }).catch((error) => alert(error));

        await db
            .collection("peoples")
            .doc(id)
            .collection("friends")
            .doc(temp)
            .set({
                haveChats: true
            })
            .then(() => {
                console.log("merge4");
            })
            .catch((error) => alert(error));
            navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) => setSearchText(text)}
                //onSubmitEditing={addConversation}
                //style={{ height: 50, marginHorizontal: 80 }}
                placeholder='enter name'
            ></TextInput>
            <ScrollView style={{ height: '100%' }}>
                {
                    friendsToAdd.filter(filterZZZ).map(({ id, data: { name, profilePhoto } }) => (
                        <FriendListItem key={id} func={addConversation} friendName={name} id={id} friendPhoto={profilePhoto} />
                    ))
                }
            </ScrollView>



        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    button: {
        // width: '100%',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#ffc0c0'

    }, container: {
        paddingHorizontal: 10,
        paddingTop: 50,
        marginBottom: 135
    },
})