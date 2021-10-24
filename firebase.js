// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUsnnZtP_lFkLBjoc7za6Kalh8mADjRHM",
  authDomain: "mancyurie-app.firebaseapp.com",
  projectId: "mancyurie-app",
  storageBucket: "mancyurie-app.appspot.com",
  messagingSenderId: "16301066426",
  appId: "1:16301066426:web:a0c8bcc0be9b1ec1e51a83"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);

}else{
    app = firebase.app()
}
const auth = firebase.app()
export {auth};