import React, { useState, useEffect } from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { ListItem, Avatar, icon } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from "firebase";

const NotificationListItem = ({ faCeva, navigation, name, x, y, id, photoProfile, description }) => {

    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
    })
    useEffect(() => {
        setMapRegion({
            latitude: x,
            longitude: y,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        console.log("ce bine e1")
    }, [x, y, navigation, name])
    return (
        <ListItem onPress={() => faCeva(x,y)} key={id} containerStyle={{marginBottom:15,backgroundColor:'red',opacity:'10%'}}>
            <View style={{ backgroundColor: "white", padding: 10, marginBottom: 15, marginLeft: 10, marginRight: 10, borderRadius: 15 }}>
                <ListItem containerStyle={{backgroundColor:'transparent',alignSelf:'center'}}>
                    <View>
                        <Avatar
                            rounded
                            source={{
                                uri: photoProfile
                            }}
                        />


                    </View>
                    <ListItem.Content >
                        <ListItem.Title style={{ fontWeight: "bold" }}>
                            {name}
                        </ListItem.Title>
                        <ListItem.Subtitle
                            numberOfLines={1}
                            ellipsizeMode="tail"

                        >
                            {description}
                        </ListItem.Subtitle>

                    </ListItem.Content>
                </ListItem>
                <View style={{ paddingBottom: 10 }}>
                    <MapView
                        initialRegion={mapRegion}
                        region={mapRegion}
                        scrollEnabled={false}
                       
                        rotateEnabled={false}
                        zoomEnabled={false}
                        style={{ alignSelf: 'center', height: 200, width: 350 }}

                    >
                        <Marker coordinate={mapRegion} title='Marker' focusable={true}>
                            <Image
                                source={require('../Icons/marker.png')}
                                style={{ height: 50, width: 51 }}
                            />
                            <Image
                                source={require('../Icons/cat.png')}
                                style={{ height: 24, width: 24, position: 'absolute', bottom: 21, left: 14, borderRadius: 14 }}
                            />
                        </Marker>
                    </MapView>
                    <Text style={{ paddingLeft: 10 }}>
                        In urma cu 15 minute
                    </Text>

                </View>
            </View>
        </ListItem>
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
