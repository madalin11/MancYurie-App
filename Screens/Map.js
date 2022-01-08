
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react'

const Map = ({ navigation, route }) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    useEffect(() => {
        setmapRegion({
            latitude: route.params.x,
            longitude: route.params.y,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }, [route,navigation])
    return (
        <View style={styles.container}>
            <MapView
                region={mapRegion}
                style={{ alignSelf: 'stretch', height: '100%' }}
                initialRegion={mapRegion}
                loadingEnabled={true}
            >
                <Marker  coordinate={mapRegion} >
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
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {


        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#ffc0c0'



    }
})
