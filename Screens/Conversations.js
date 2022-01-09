import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView } from 'react-native'
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

            <View style={{ flexDirection: 'row', marginVertical: 70 }}>
                <Text style={{ top: -62, marginBottom: 75, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                Conversations
            </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Add chat")}
                >
                    <Image style={{ width: 20, height: 20, marginLeft: 50 }} source={require('../Icons/leftarrow.png')}>

                    </Image>
                </TouchableOpacity>
            </View>
            <TextInput

                onChangeText={(text) => setTextSearch(text)}
                placeholder='Search' style={{ backgroundColor: 'white', height: 20, marginBottom: 100, paddingLeft: 15, marginTop: 50, borderRadius: 19 }}>

            </TextInput>
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
