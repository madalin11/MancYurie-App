
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'


const Map = ({ navigation, route }) => {
    const temp = auth.currentUser.uid;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friends2, setFriends2] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [mapRegion, setmapRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
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
    async function updateLocation(loc) {
        await db.collection("peoples").doc(temp).update({
            coord:
            {
                x: loc.coords.latitude,
                y: loc.coords.longitude,

            }
        }).then(() => {
            console.log("loc");
        }).catch((error) => alert(error));
    }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            updateLocation(location)

        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);

    }
    console.log(text)
    useEffect(() => {
        setmapRegion({
            latitude: route.params?.x || 46.00397018301628,
            longitude: route.params?.y || 21.667814917560527,
            latitudeDelta: 1.922,
            longitudeDelta: 1.0421,
        })
    }, [route, navigation])
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
    function checkTextInput() {
        //Check for the Name TextInput
        if (!firstName.trim()) {
            alert('Please Enter First Name');
            return;
        }
    }
    async function addPost(loc) {
        if (checkTextInput) {
            await db.collection("peoples").doc(temp).update({
                posts: firebase.firestore.FieldValue.arrayUnion({

                    coord: {
                        x: loc.coords?.latitude,
                        y: loc.coords?.longitude
                    },
                    description: input,

                })
            }).then(() => {
                console.log("merge");
            }).catch((error) => alert(error));
        }
    }
    const [input, setInput] = useState('')
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>New Post</Text>
                            <TextInput onChangeText={(text) => setInput(text)} placeholder='Description' placeholderTextColor={'#909090'} style={{ bottom: 30, backgroundColor: '#CEFEFB', borderRadius: 15, padding: 10 }}>

                            </TextInput>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.baluba]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    addPost(location)
                                }}
                            >
                                <Text style={styles.textStyle}>Add post</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>

                </Modal>
            </KeyboardAvoidingView>
            <MapView
                // userInterfaceStyle={'dark'}
                // showsUserLocation
                // showsMyLocationButton
                region={mapRegion}
                style={{ alignSelf: 'stretch', height: '100%' }}
                initialRegion={mapRegion}
                loadingEnabled={true}
            >
                {friends2.map(({ id, data }) =>
                (data.posts?.map((elm) =>
                (<Marker title={elm.description} coordinate={{ latitude: elm.coord?.x || 0, longitude: elm.coord?.y || 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }} key={makeid(8)} >
                    <Image
                        source={require('../Icons/maps-and-flags.png')}
                        style={{ height: 24, width: 24 }}
                    />
                </Marker>)
                )))
                }

                {friends2.map(({ id, data }) =>
                (
                    <Marker title={data.name} coordinate={{ latitude: data.coord?.x || 0, longitude: data.coord?.y || 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }} key={makeid(6)} >
                        <Image
                            source={require('../Icons/marker.png')}
                            style={{ height: 50, width: 51 }}
                        />
                        <Image
                            source={{ uri: data.profilePhoto }}
                            style={{ height: 24, width: 24, position: 'absolute', bottom: 21, left: 14, borderRadius: 14 }}
                        />
                    </Marker>)
                )
                }
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', top: 627, left: 325, borderRadius: 15, width: 50, height: 50 }}>
                    <Image source={require('../Icons/share.png')} style={{ bottom: 0, top: 630, left: 330, height: 40, width: 40 }}>
                    </Image>
                </TouchableOpacity>

            </MapView>
        </View >
    )
}

export default Map

const styles = StyleSheet.create({
    container: {


        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#ffc0c0'



    },
    centeredView: {
        flex: 1,
        //justifyContent: "center",

        alignItems: "center",
        marginTop: 22
    },
    baluba: {
        marginTop: 45,
    },

    modalView: {
        marginTop: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 40,
        paddingVertical: 60,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingBottom: 25
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 40,
        elevation: 2,
        marginVertical: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 60,
        textAlign: 'center',
        bottom: 40,
        color: '#3570EC',
        fontWeight: '700'

    }

})

