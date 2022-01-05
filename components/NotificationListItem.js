import React, { useState } from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button,Image } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config';
import MapView, { Marker } from 'react-native-maps';

const NotificationListItem = ({route}) => {
    const [mapRegion, setmapRegion] = useState({
        latitude:  45.74794349487929, 
        longitude: 21.224734000257573,
        latitudeDelta: 0.00000000000922,
        longitudeDelta: 0.0421,
        
    });
    return (
        <View style={{ backgroundColor: "white", padding: 10, marginBottom: 15, marginLeft: 10, marginRight: 10, borderRadius: 15 }}>
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
            <View style={{ paddingBottom: 10 }}>
                    <MapView
                        
                        scrollEnabled={false}
                        rotateEnabled={false}
                        zoomEnabled={false}
                        style={{ alignSelf: 'stretch',height:200,width:350 }}
                        region={mapRegion}
                        
                    >
                        <Marker coordinate={mapRegion} title='Marker' focusable={true}>
                        <Image
                        source={require('../Icons/marker.png')}
                        style={{ height: 50, width: 51 }}
                    />
                    <Image
                        source={require('../Icons/cat.png')}
                        style={{ height: 24, width: 24,position:'absolute',bottom:21,left:14,borderRadius:14 }}
                    />
                        </Marker>
                    </MapView>
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
        height: 200,

        padding: 15,
        marginTop: 10,
        marginRight: 15,
        alignContent: 'center'
    }
})
