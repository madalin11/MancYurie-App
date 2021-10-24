import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    return (
        
        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => navigation.replace("Login screen")}
                style={styles.container}

            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 45 }}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate("Chat screen")}>
                <Text>
                    Add friend
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.map}
            onPress={()=>navigation.navigate("Map screen")}>
                <Text>
                    Check this map
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    button: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc0c0'

    },
    container: {
        padding: 15,
        backgroundColor: '#202020',
        borderRadius: 10,
        width: '60%',
        paddingVertical: 15,
        marginHorizontal: 10,

        alignItems: 'center'
    }
    
})
