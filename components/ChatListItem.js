import React from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config';

const ChatListItem = () => {
    return (
        <ListItem>

            <Avatar
                rounded
                source={{
                    uri: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-male-avatar-vector-icon-png-image_4005105.jpg"
                }}
            />
            <ListItem.Content >
                <ListItem.Title style={{ fontWeight: "800" }}>
                    Andrei Pop
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
