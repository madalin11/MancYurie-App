import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import FriendListItem from '../components/FriendListItem';
import { auth, db, storage } from '../firebase'

const AddFriend = ({ navigation }) => {
    const [friendsToAdd, setFriendsToAdd] = useState([]);
    const [friendsAdded, setFriendsAdded] = useState([]);
    const temp = auth.currentUser.uid;
    const [textSearch, setTextSearch] = useState('');
    const [searchableFriends, setSearchabelFriends] = useState([]);
    let t = false

    useEffect(() => {

        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("friends").onSnapshot(snapshot => {
                setFriendsAdded(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .onSnapshot(snapshot => {
                setFriendsToAdd(
                    snapshot.docs.filter((doc) => {
                        let t = true;
                        friendsAdded.forEach(element => {
                            if (element.id == doc.id)
                                t = false;
                        });
                        return t;
                    }
                    ).map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                setSearchabelFriends(friendsToAdd);
            }

            )

        return unsubscribe;
    }, [friendsAdded])
    const [photo, setPhoto] = useState('');

    const getPhoto = () => {
        const files = ['../Icons/chat.png'];
        files.map(filename => {
            storage
                .ref(`/covers/${filename}`)
                .getDownloadURL()
                .then(url => {
                    console.log("Got download url: ", url);
                });
        });
    }
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



    // function filterFunction(value) {
    //     let f = friendsToAdd.filter((doc) => {
    //         let t = false;
    //         friendsAdded.forEach(element => {
    //             if (element.id != doc.id)
    //                 t = true;
    //         });
    //         return t;

    //     })
    //     if (value == '')
    //         setSearchabelFriends(t)
    //     else {
    //         setSearchabelFriends(t.filter((element)=>element.data.nume.includes(value)))
    //     }

    // }
    async function createFriend(id) {
        await db.collection("peoples").doc(temp).collection("friends").doc(id).set({
            haveChats: false
        })

            .then(() => {
                console.log("merge");
            }).catch((error) => alert(error));
        await db.collection("peoples").doc(id).collection("friends").doc(temp).set({
            haveChats: false
        })

            .then(() => {
                console.log("merge");
            }).catch((error) => alert(error));
    }
    return (

        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />

            <Text style={{ marginTop: 85, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                Find Friends
            </Text>

            <View style={{ marginBottom: 40, marginTop: 30 }}>

                <TextInput

                    onChangeText={(text) => setTextSearch(text)}
                    placeholder='Search by name' style={{ fontSize: 18, backgroundColor: 'white', height: 45, marginBottom: 1, paddingLeft: 55, marginHorizontal: 35, marginTop: 0, borderRadius: 19 }}
                >

                </TextInput>

                <TouchableOpacity style={{ position: 'absolute' }} onPress={Keyboard.dismiss}>
                    <Image source={require('../Icons/search.png')} style={{ top: 8, left: 49, width: 30, height: 30, }}></Image>
                </TouchableOpacity>

            </View>

            <ScrollView style={{ height: '100%' }}>
                {
                    friendsToAdd.filter(filterZZZ).map(({ id, data: { name, profilePhoto } }) => (
                        <FriendListItem key={id} iconPath={1} func={createFriend} friendName={name} id={id} friendPhoto={profilePhoto} />
                    ))
                }
            </ScrollView>
        </View >

    )
}

export default AddFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
