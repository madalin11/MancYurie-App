import React, { useState, useEffect } from 'react'
import { getAuth } from "firebase/auth"

import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView, TabBarIOSItem } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { updateProfile } from "firebase/auth";
import NotificationListItem from '../components/NotificationListItem';
import StoryItem from '../components/StoryItem';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Avatar, icon } from 'react-native-elements'
const Tab = createBottomTabNavigator();
import * as firebase from 'firebase'




const Home = ({ navigation }) => {
    const [stories, setStories] = useState([]);
    const [stories2, setStories2] = useState([]);

    const [friends, setFriends] = useState([]);
    const [friends2, setFriends2] = useState([]);
    const [posts, setPosts] = useState([]);
    const temp = auth.currentUser.uid;
    const auth2 = auth.currentUser;
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
    }, [temp, auth2])



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
    const faCeva = (x, y) => {
        navigation.navigate("Map screen", {
            x: x,
            y: y
        });
    }
    async function createStory() {
        navigation.navigate("ImagePicker1", {
            id: 1
        })
    }
    const [ceva, setCeva] = useState('')


    const firstn = auth.currentUser.displayName.split(" ")
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
                {firstn?.[1]}
            </Text>
            <Text style={{ color: 'white', paddingLeft: 15, marginTop: 15 }}>
                Your Featured Stories
            </Text>

            <ScrollView horizontal={true} backgroundColor={"transparent"} showsHorizontalScrollIndicator={false} >
                <TouchableOpacity onPress={() => createStory()} style={{ marginTop: 14, marginHorizontal: 13 }}>
                    <Avatar
                        containerStyle={{ backgroundColor: '#202020' }}
                        rounded
                        size={"large"}
                        source={require('../Icons/addStory.png')}
                    />
                </TouchableOpacity>
                {friends2.map(({ id, data }) =>
                (data.stories?.map((elm) =>
                    (<StoryItem key={makeid(6)} photoUrl={elm} />)
                )))
                }
                {/* {stories2.map(({ id, data: { photoUrl } }) => (
                    <StoryItem key={id} id={id} photoUrl={photoUrl} />
                ))} */}


            </ScrollView>

            <ScrollView style={{ marginTop: 10 }}>
                {friends2.map(({ id, data }) =>
                (data.posts?.map((elm) =>
                    (<NotificationListItem key={makeid(6)} faCeva={faCeva} photoProfile={data.profilePhoto} name={data.name} description={elm.description} x={elm.coord.x} y={elm.coord.y} />)
                )))
                }




            </ScrollView>
        </SafeAreaView>
    )
}
export default Home
const styles = StyleSheet.create({
    button: {
        //width: '100%',
        flex: 1,
        //justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: '#202020',


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
        // padding: 15,
        // backgroundColor: 'tr',
        borderRadius: 10,

        marginTop: 10,


        //alignItems: 'center'
    }

})
