import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db,auth } from '../firebase'

const FriendListItem = ({ friendName, id, friendPhoto }) => {
    const temp = auth.currentUser.uid;
    async function createFriend(){
        await db.collection("peoples").doc(temp).collection("friends").doc(id).set({})
        
        .then(()=>{
            console.log("merge");
        }).catch((error)=>alert(error));
    }

    
    return (
        <ListItem key={id} containerStyle={{ backgroundColor: 'white',borderRadius:30,marginBottom:10,marginTop:10 }}>
            
                <Avatar
                    containerStyle={{ backgroundColor: '#202020' }}
                    rounded
                    size={"medium"}
                    source={{
                        uri: friendPhoto
                    }}
                />
                <View style={{}}>
                    <Text style={{fontSize:24,fontWeight:'bold',textAlign:'left'}} >
                        {friendName}
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>createFriend()} style={{ }}>
                    <Image style={{ height: 20, width: 20 }} source={require("../Icons/leftarrow.png")} />
                </TouchableOpacity>
            
        </ListItem>
    )
}

export default FriendListItem

const styles = StyleSheet.create({})
