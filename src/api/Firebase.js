// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyAkzoE62FGELaKGC8Y7hEWLGyVOcKA9NEY",
    authDomain: "scoreboard-b308c.firebaseapp.com",
    projectId: "scoreboard-b308c",
    storageBucket: "scoreboard-b308c.appspot.com",
    messagingSenderId: "559586732700",
    appId: "1:559586732700:web:d9f7e8e61697000564db59",
    measurementId: "G-8DF08L9N5X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export function createUser(email, password, success, fail) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        // user created successfully
        success(cred);

    }).catch(error => {
        fail(error);
    });
}

export function createProfile(userId, data, success, fail) {
    const db = firebase.firestore();

    db.collection("users").doc(userId).set({
        ...data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(docRef => {
        // user profile created
        success(docRef);
    }).catch(error => {
        fail(error);
    });
}

export function IsLoggedIn(loginFnc, logoutFnc) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            loginFnc(user);
        } else {
            logoutFnc();
        }
    });
}

export function logUserIn(email, password, fail) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
        })
        .catch((error) => {
            fail(error);
        });
}

export function logUserOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log("failed to sign user out: ", error);
    });
}