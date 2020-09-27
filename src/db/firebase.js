import * as firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDnyykVGqpifKz2ZF98lZuxTgXNVlmCKpo",
  authDomain: "vue-tesis-carretero-covelli.firebaseapp.com",
  databaseURL: "https://vue-tesis-carretero-covelli.firebaseio.com/",
  projectId: "vue-tesis-carretero-covelli",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
});

export const firebaseUtils = {
  db: app.database(),

  auth: firebase.auth(),

  loginWithGoogle: function() {
    const baseProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(baseProvider);
  },

  addFolder: function(folder) {
    const newFolder = app
      .database()
      .ref("folders/")
      .push();
    newFolder.set(folder);
  },

  getFolders: function() {
    return firebase
      .database()
      .ref("folders/")
      .once("value");
  },

  addExercise: function(folderId, exercise) {
    const folder = app
      .database()
      .ref(`folders/${folderId}/exercises`)
      .push();
    folder.set(exercise);
  },

  addUser: function() {
    const googleUser = firebase.auth().currentUser;
    const user = {
      name: googleUser.displayName,
      email: googleUser.email,
      photoURL: googleUser.photoURL,
    };
    return app
      .database()
      .ref(`users/${googleUser.providerData[0].uid}`)
      .set(user);
  },

  getCurrentUser: function() {
    const userId = firebase.auth().currentUser.providerData[0].uid;
    return app
      .database()
      .ref(`users/${userId}`)
      .once("value");
  },

  addTestToHistory: function(exerciseId, passedFlag, test, oldInfo) {
    if (oldInfo.passedBefore === passedFlag) {
      return;
    }

    const userId = firebase.auth().currentUser.providerData[0].uid;

    let newTest;
    if (oldInfo.passedBefore) {
      app
        .database()
        .ref(
          `users/${userId}/history/${exerciseId}/passedTests/${oldInfo.historyId}`
        )
        .remove();
      newTest = app
        .database()
        .ref(`users/${userId}/history/${exerciseId}/notPassedTests`)
        .push();
    } else {
      app
        .database()
        .ref(
          `users/${userId}/history/${exerciseId}/notPassedTests/${oldInfo.historyId}`
        )
        .remove();
      newTest = app
        .database()
        .ref(`users/${userId}/history/${exerciseId}/passedTests`)
        .push();
    }
    newTest.set(test.name);
    test.historyId = newTest.key;
  },

  updateUserStatistics: function(passedFlag, newValue) {
    const userId = firebase.auth().currentUser.providerData[0].uid;
    if (passedFlag) {
      app
        .database()
        .ref(`users/${userId}/statistics/passed`)
        .set(newValue);
    } else {
      app
        .database()
        .ref(`users/${userId}/statistics/notPassed`)
        .set(newValue);
    }
  },

  parseFolders(folders) {
    let result = [];
    for (const idFolder in folders) {
      let folder = folders[idFolder];
      let newFolder = {
        id: idFolder,
        label: folder["name"],
        children: [],
      };
      for (const idExercise in folder["exercises"]) {
        let exercise = folder["exercises"][idExercise];
        newFolder["children"].push({
          id: exercise["id"],
          label: exercise["name"],
          exercise: exercise,
        });
      }
      result.push(newFolder);
    }
    return result;
  },
};

/*const exercise = {
        "statement": "Dados dos numeros x e y, definir la funcion 'suma(x,y)' que retorne la suma de dos numeros pasados por parametros",
        "solution": "function suma(first, second) { return first + second; } const resultado = suma(x, y);",
        "suiteTest": [
          { "name": "Test Name 1", "result": 25, "test": "const x = 10; const y = 15" },
          { "name": "Test Name 2", "result": -25, "test": "const x = -10; const y = -15" }
        ]
      };
      context.state.firebaseUtils.addExercise('-MH7B5tdGcg90vYJNXl8', exercise);*/
