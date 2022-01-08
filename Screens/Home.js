import React, { useState, useEffect } from 'react'
import { getAuth } from "firebase/auth"

import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { updateProfile } from "firebase/auth";
import NotificationListItem from '../components/NotificationListItem';
import StoryItem from '../components/StoryItem';
import { LinearGradient } from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();




const Home = ({ navigation }) => {
    const [stories, setStories] = useState([]);
    const [stories2, setStories2] = useState([]);

    const [friends, setFriends] = useState([]);
    const [friends2, setFriends2] = useState([]);
    const [posts, setPosts] = useState([]);
    const temp = auth.currentUser.uid;
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("stories")
            .onSnapshot(snapshot => {
                setStories(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
                // setStories(stories.concat(stories2));
            })
        return unsubscribe;
    }, [temp])
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .doc(temp)
            .collection("friends")
            .onSnapshot(snapshot => {
                setFriends(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            })
        return unsubscribe;
    }, [temp])
    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .onSnapshot(snapshot => {
                setFriends2(
                    snapshot.docs.filter((doc) => {
                        let t = false;
                        friends.forEach(element => {
                            if (element.id == doc.id) {
                                t = true;
                            }
                        });
                        return t;
                    }
                    ).map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))

            })

        return unsubscribe;
    }, [friends])
    const [stories3, setStories3] = useState([]);

    useEffect(() => {
        console.log(friends2)
friends2.forEach(element => {
    

        db
            .collection("peoples")
            .doc(element.id).collection("stories").onSnapshot(snapshot => {
                setStories2(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                    //setStories3(stories3.concat(stories2));
                    //setStories2([])
            })


});

    }, [friends2])



    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login screen")
            })
            .catch(error => alert(error.message))
    }
    const updateUSER = () => {

        const auth1 = auth.currentUser;
        console.log(auth1.displayName)
        // Updates the user attributes:
        auth1.updateProfile({
            displayName: "fgf"
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated successfully!
            console.log(auth1.uid)

        })
            .catch(error => alert(error.message));

    }
    return (

        <SafeAreaView style={styles.button}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <Text style={styles.text}>
                Hello,
            </Text>
            <Text style={styles.text1}>
                Andrei
            </Text>
            <Text style={{ color: 'white', paddingLeft: 15, marginTop: 15 }}>
                Your Featured Stories
            </Text>
            <ScrollView horizontal={true} backgroundColor={"transparent"}  >
                {stories.map(({ id, data: { photoUrl } }) => (
                    <StoryItem key={id} id={id} photoUrl={photoUrl} />
                ))}
                {/* {stories2.map(({ id, data: { photoUrl } }) => (
                    <StoryItem key={id} id={id} photoUrl={photoUrl} />
                ))} */}

            </ScrollView>

            <ScrollView style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Map screen")}>
                    <NotificationListItem />
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    )
}
export default Home
const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#202020',


    },
    text: {
        paddingTop: 15,
        color: '#777777',
        paddingLeft: 15,
        fontSize: 30
    },
    text1: {
        color: 'white',
        paddingLeft: 15,
        fontSize: 40
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    },
    container: {
        padding: 15,
        backgroundColor: '#202020',
        borderRadius: 10,

        marginTop: 10,


        alignItems: 'center'
    }

})
