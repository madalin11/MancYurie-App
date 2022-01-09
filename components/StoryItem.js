import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'

const StoryItem = ({id,photoUrl}) => {
    return (
        <ListItem key={id} containerStyle={{ backgroundColor: 'transparent', marginBottom: 20 }}>
            <View style={{ marginBottom: 15 }}>
                <Avatar
                    containerStyle={{ backgroundColor: '#202020' }}
                    rounded
                    size={"large"}
                    source={{
                        uri: photoUrl
                    }}
                />
            </View>
        </ListItem>
    )
}

export default StoryItem

const styles = StyleSheet.create({})
