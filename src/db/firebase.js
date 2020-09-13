import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDnyykVGqpifKz2ZF98lZuxTgXNVlmCKpo",
    authDomain: "vue-tesis-carretero-covelli.firebaseapp.com",
    databaseURL: "https://vue-tesis-carretero-covelli.firebaseio.com/",
    projectId: "vue-tesis-carretero-covelli",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
});

const loginWithGoogle = function() {
    const baseProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(baseProvider);
};

export const firebaseUtils = {
    db: app.database(),
    auth: firebase.auth(),
    loginWithGoogle: loginWithGoogle
};