import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'





const Home = ({navigation}) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity
                    onPress={() => navigation.navigate("Login screen")}
                    style={styles.container}

                >
                    <Text style={{color:'white',fontWeight:'bold',fontSize:45}}>Sign out</Text>
                </TouchableOpacity>
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    button:{
        width: '100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffc0c0'
        
    },
    container:{
        padding:15,
        backgroundColor:'#202020',
        borderRadius:10,
        width:'60%',
        paddingVertical:15,
        marginHorizontal:10,
    
        alignItems:'center'
    },
})
