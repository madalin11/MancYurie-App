import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase'
import { auth, storage, db } from '../firebase';

const CameraRoom = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [sendPhoto, setSendPhoto] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const ref = useRef(null)
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const id = route.params.id
    const temp = auth.currentUser.uid;
    console.log(temp, id)
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
    async function sendMPhoto(p) {
        if (p) {
            await db
                .collection("peoples")
                .doc(temp).collection("friends")
                .doc(id)
                .collection("messages")
                .doc(makeid(15))
                .set({
                    message: p,
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
                    message: p,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: temp
                })
                .then(() => {
                    console.log("merge2");
                })
                .catch((error) => alert(error));
        }
        setSendPhoto('')

    }
    async function uploadImage(uri) {
        const response = await fetch(uri);
        const blob = await response.blob();
        // calling firebase storage api

        return blob;

    }
    const _takePhoto = async () => {
        const options = { quality: 0.1, base64: true };
        const photo = await ref.current.takePictureAsync(options)
        // imagesRef now points to 'images'
        // Child references can also take paths delimited by '/'
        // let blob;
        // const response = await fetch(photo.uri).then(() => {
        //     blob = response.blob()
        // })
        // //const blob = await response.blob().then(() => console.log(";;;;;;"))
        console.log(photo.uri)
        // var refp = storage.ref().child("my-image");
        // var refp1 = await storage.ref().child("my-image/dddd" + makeid(5));
        // // await refp1.put(blob)
        // //     .then(() => {

        // //     }).catch((error) => alert(error));
        // const blob = await uploadImage(photo.uri)
        // await refp1.put(blob)
        // await refp1.getDownloadURL().then((downloadURL) => {
        //     console.log('File available at', downloadURL);
        sendMPhoto(photo.uri)

        // }).catch((error) => alert(error));
        // console.log("merge");
        // await sendMPhoto().then(() => console.log("s-a trimis"))

        navigation.navigate("Chat room", {
            id: route.params.id,
            friendName: route.params.friendName,
            friendPhoto: route.params.friendPhoto
        })



    }
    const onPictureSaved = photo => {
        console.log(photo);
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref}>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        onPress={_takePhoto}
                        style={{ flex: 1.5 }}
                    >
                        <Image style={{ width: 80, height: 80 }} source={require('../Icons/snap.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );

                        }}>
                        <Image style={{ width: 40, height: 40 }} source={require('../Icons/camera.png')}></Image>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

export default CameraRoom

const styles = StyleSheet.create({
    container: { flex: 1, height: "100%" },
    camera: { flex: 1, height: "100%" },
    buttonContainer: { bottom: 60, flexDirection: 'row', alignSelf: 'flex-start', alignContent: 'center', alignItems: 'flex-end', flex: 1 },
    button: { marginTop: 100, flex: 1.5 },
    text: {},
})
