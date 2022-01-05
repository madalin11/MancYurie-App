import React from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native'
import { ListItem, Avatar, icon, Image } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config';

const NotificationListItem = () => {
    return (
        <View style={{ backgroundColor: "white", padding:10,marginBottom:15,marginLeft:10,marginRight:10, borderRadius: 15 }}>
            <ListItem>
                <View>
                    <Avatar
                        rounded
                        source={{
                            uri: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-male-avatar-vector-icon-png-image_4005105.jpg"
                        }}
                    />


                </View>
                <ListItem.Content >
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                        Andrei Pop
                    </ListItem.Title>
                    <ListItem.Subtitle
                        numberOfLines={1}
                        ellipsizeMode="tail"

                    >
                        Ce frumos e la cuied !!!
                    </ListItem.Subtitle>

                </ListItem.Content>
            </ListItem>
            <View style={{ paddingBottom: 10}}>
                <Image style={styles.imageStyle} source={require('../Icons/maps.png')} />
                <Text style={{ paddingLeft: 10 }}>
                    In urma cu 15 minute
                </Text>

            </View>
        </View>
    )
}

export default NotificationListItem

const styles = StyleSheet.create({
    imageStyle: {
        //alignSelf: 'center',
        width: '100%',
        height:200,
        
        padding:15,
        marginTop: 10,
        marginRight: 15,
        alignContent: 'center'
    }
})
