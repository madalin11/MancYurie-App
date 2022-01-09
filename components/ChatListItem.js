import React from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config';

const ChatListItem = ({ enterChat, id, friendPhoto, friendName }) => {
    return (
        <ListItem containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20 }} style={{ marginBottom: 10, marginHorizontal: 28, borderRadius: 20 }} key={id} onPress={() => enterChat(id, friendName, friendPhoto)}>

            <Avatar
                rounded
                source={{
                    uri: friendPhoto
                }}
            />
            <ListItem.Content >
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {friendName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Ce faci azi mai ?adadadadadddwadwfefefefeeffewgegw
                </ListItem.Subtitle>

            </ListItem.Content>

        </ListItem>

    );
};

export default ChatListItem

const styles = StyleSheet.create({})
