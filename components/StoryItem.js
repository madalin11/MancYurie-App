import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'

const StoryItem = () => {
    return (
        <ListItem containerStyle={{ backgroundColor: 'transparent', marginBottom: 20 }}>
            <View style={{ marginBottom: 15 }}>
                <Avatar
                    containerStyle={{ backgroundColor: '#202020' }}
                    rounded
                    size={"large"}
                    source={{
                        uri: "https://www.pngfind.com/pngs/m/341-3415733_male-portrait-avatar-face-head-black-hair-shirt.png"
                    }}
                />
            </View>
        </ListItem>
    )
}

export default StoryItem

const styles = StyleSheet.create({})
