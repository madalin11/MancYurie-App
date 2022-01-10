import React, { useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, PlatformColor, ScrollView, TextInput } from 'react-native'
import { auth, db } from '../firebase'
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import NotificationListItem from '../components/NotificationListItem';
import { doc, getDoc } from "firebase/firestore";
import * as firebase from "firebase"



const UserProfile = ({ navigation, route }) => {

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login screen' }],
                });
            })
            .catch(error => alert(error.message))
    }
    useLayoutEffect(() => {
        setPhoto(auth.currentUser.photoURL)
        setName(auth.currentUser.displayName)
    }, [route])
    const [postss, setPosts] = useState([]);
    const temp = auth.currentUser.uid;
    const [name, setName] = useState(auth.currentUser.displayName);
    const [photo, setPhoto] = useState(auth.currentUser.photoURL);

    async function getPosts() {
        const docRef = db.collection('peoples').doc(temp);

        // asynchronously retrieve the document

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setPosts({
                    data: doc.data(),
                    id: temp
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    useEffect(() => {
        const unsubscribe = db
            .collection("peoples")
            .onSnapshot(snapshot => {

                setPosts(
                    snapshot.docs.filter((doc) => (doc.id == temp
                    )).map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))

            })

        return unsubscribe;
    }, [db])

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

    const [friends, setFriends] = useState([])
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
    }, [])
    return (
        <View style={styles.button}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ADD8E6', '#D6F3F2', 'white']}
                style={styles.background}
            />
            <View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ top: 24, marginTop: 60, fontSize: 24, textAlign: 'center', color: '#3570EC', fontWeight: '500' }}>
                        Profile
                    </Text>

                    <TouchableOpacity raised onPress={handleSignOut} style={{ alignSelf: 'flex-start' }}>
                        <Image source={require('../Icons/logout.png')} style={{ marginLeft: 10, width: 20, height: 20 }} />
                    </TouchableOpacity>

                    <TouchableOpacity raised onPress={() => navigation.navigate("Update Profile")} style={{ alignSelf: 'flex-end' }}>
                        <Image source={require('../Icons/settings.png')} style={{ width: 60, height: 60, marginTop: -40, left: 7 }} />
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView >
                <View style={{ marginTop: 20, marginBottom: 50 }}>
                    <Image
                        source={{ uri: photo || "" }}
                        style={{ height: 110, width: 110, bottom: 0, alignSelf: 'center', borderRadius: 60 }}
                    />
                    <Text style={{ fontWeight: '500', fontSize: 22, top: 0, textAlign: 'center' }}>
                        {name}
                    </Text>
                    <Text style={{ fontWeight: '300', fontSize: 16, top: 0, textAlign: 'center' }}>

                    </Text>

                    <View style={{ marginTop: 30, marginLeft: 35, marginRight: 35, flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontWeight: '300', fontSize: 16, top: 0, left: 0, alignSelf: 'flex-start' }}>
                            Friends
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: 16, top: 0, left: 0, alignSelf: 'flex-end' }}>
                            Posts
                        </Text>
                    </View>

                    <View style={{ marginLeft: 42, marginRight: 43, flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontWeight: '700', fontSize: 16, top: 0, left: 0, alignSelf: 'flex-start', marginLeft: 15 }}>
                            {friends?.length || 0}
                        </Text>
                        <Text style={{ fontWeight: '700', fontSize: 16, top: 0, left: 0, alignSelf: 'flex-end', marginRight: 7 }}>
                            {postss[0]?.data.posts?.length || 0}
                        </Text>
                    </View>


                </View>

                {postss.map(({ id, data }) =>
                (data.posts?.map((elm) =>
                    (<NotificationListItem key={makeid(6)} faCeva={faCeva} photoProfile={data.profilePhoto} name={data.name} description={elm.description} x={elm.coord.x} y={elm.coord.y} />)
                )))
                }
            </ScrollView>
        </View >
    )
}

export default UserProfile

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#ffc0c0'

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
})
