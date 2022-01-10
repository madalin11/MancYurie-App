import React, { createElement, useState } from 'react'
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'


const ImagePicker1 = ({ navigation }) => {
    const temp = auth.currentUser.uid
    const [image, setImage] = useState('')

    async function createStory(image) {
        await db.collection("peoples").doc(temp).update({
            stories: firebase.firestore.FieldValue.arrayUnion(image)
        }).then(() => {
            console.log("merge");
            navigation.goBack();
        }).catch((error) => alert(error));
    }
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync(
            {
                ediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            }
        );

        // Explore the result
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
            createStory(result.uri)
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={showImagePicker} />
        </View>
    )
}

export default ImagePicker1

const styles = StyleSheet.create({})