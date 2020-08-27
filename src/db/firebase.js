import {initializeApp} from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyDnyykVGqpifKz2ZF98lZuxTgXNVlmCKpo",
    authDomain: "vue-tesis-carretero-covelli.firebaseapp.com",
    databaseURL: "https://vue-tesis-carretero-covelli.firebaseio.com/",
    projectId: "vue-tesis-carretero-covelli",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
});

export const db = app.database();