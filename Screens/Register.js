import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { auth ,db} from '../firebase'


const Register = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetePassword, setRepetePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
   
    function checkTextInput() {
        //Check for the Name TextInput
        if (!firstName.trim()) {
            alert('Please Enter First Name');
            return;
        }
        if (!phoneNumber.trim()) {
            alert('Please Enter Phone Number');
            return;
        }
        if (!lastName.trim()) {
            alert('Please Enter Last Name');
            return;
        }
        if(repetePassword.trim()!==password.trim()){
            alert('Password does\'t match');
            return;
        }

        return true;
    };
  async function createPeople(temp){
        await db.collection("peoples").doc(temp).set({
            coord:"37.78825,-122.4324"
        }).then(()=>{
            console.log("merge");
        }).catch((error)=>alert(error));
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {

                navigation.replace("Tab Stack")
            }
        })

        return unsubscribe
    }, [])
    const handleSignUp = () => {
        if (checkTextInput() == true) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    const auth1 = authUser.user;
                    console.log(auth1.displayName)
                    // Updates the user attributes:
                    const fullName = firstName + " " + lastName;
                    auth1.updateProfile({

                        displayName: fullName,
                        photoURL:photoUrl || "https://favpng.com/png_view/avatar-user-profile-icon-design-png/eg0SZK0T"
            
                    }).then(function () {
                        // Profile updated successfully!
                        //createPeople();
                        //temp=auth1.uid;
                        console.log(auth1.uid)
                       createPeople(auth1.uid);
                    }, function (error) {
                        // An error happened.
                    });
                })
                .catch(error => alert(error.message))
        }
    }

    return (
        <View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Firs Name"
                    type="text"
                    autoCapitalize="words"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Last Name"
                    type="text"
                    autoCapitalize="words"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    style={styles.input}
                // secureTextEntry
                />
                <TextInput
                    placeholder="Email"
                    type="email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    keyboardType="email-address"

                />

                <TextInput
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={styles.input}
                    keyboardType="numeric"

                />
                <TextInput
                    placeholder="Photo URL (optional)"
                    value={photoUrl}
                    onChangeText={text => setPhotoUrl(text)}
                    style={styles.input}
                    

                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Repete Password"
                    value={repetePassword}
                    onChangeText={text=>setRepetePassword(text)}
                    style={styles.input}
                    secureTextEntry
                    onSubmitEditing={handleSignUp}
                />

            </View>
            <View>
                <TouchableOpacity

                    onPress={handleSignUp}
                >
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    raised onPress={() => navigation.replace("Login screen")}
                >
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <Text></Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    }
})
