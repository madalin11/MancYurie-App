
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react'

const Map = ({ navigation, route }) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View style={styles.container}>
            <MapView

                style={{ alignSelf: 'stretch', height: '100%' }}
            
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
