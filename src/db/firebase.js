import * as firebase from "firebase";

const app = firebase.initializeApp({
  // SDK vue-tesis-carretero-covelli
  apiKey: "AIzaSyDnyykVGqpifKz2ZF98lZuxTgXNVlmCKpo",
  authDomain: "vue-tesis-carretero-covelli.firebaseapp.com",
  databaseURL: "https://vue-tesis-carretero-covelli.firebaseio.com/",
  projectId: "vue-tesis-carretero-covelli",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",

  // SDK vide-tool, (!) remember to chage .firebaserc too
  // apiKey: "AIzaSyA7YthBDYtFXWI1DKnM3GYAgcRVVvDxa-U",
  // authDomain: "vide-tool.firebaseapp.com",
  // databaseURL: "https://vide-tool-default-rtdb.firebaseio.com",
  // projectId: "vide-tool",
  // storageBucket: "<BUCKET>.appspot.com",
  // messagingSenderId: "<SENDER_ID>",
});

export const firebaseUtils = {
  db: app.database(),

  auth: firebase.auth(),

  loginWithGoogle: function() {
    const baseProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(baseProvider);
  },

  signOut: function() {
    firebase.auth().signOut();
  },

  getFolderIfExist: async function(folderName) {
    const data = await this.getFolders();
    let folderId = null;
    if (data.val())
      Object.entries(data.val()).map((folder) => {
        if (folderName == folder[1].name) folderId = folder[0];
      });
    return folderId;
  },

  addFolder: function(folder) {
    const newFolder = app
      .database()
      .ref("folders/")
      .push();
    newFolder.set(folder);
    return newFolder.key;
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
    exercise.id = folder.key;
    folder.set(exercise);
  },

  addUser: function() {
    const googleUser = firebase.auth().currentUser;
    const user = {
      name: googleUser.displayName,
      email: googleUser.email,
      photoURL: googleUser.photoURL,
    };
    app
      .database()
      .ref(`users/${googleUser.providerData[0].uid}`)
      .set(user);

    return new Promise((resolve) => resolve(user));
  },

  getCurrentUser: function() {
    return new Promise((resolve) => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.providerData[0].uid;
        const user = app
          .database()
          .ref(`users/${userId}`)
          .once("value");
        resolve(user);
      } else {
        resolve();
      }
    });
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
    app
      .database()
      .ref(`users/${userId}/statistics/${passedFlag}`)
      .set(newValue);
  },

  updateExerciseStadistics: function(passedFlag, folderId, exerciseId) {
    const updates = {};
    updates[
      `folders/${folderId}/exercises/${exerciseId}/stadistics/${passedFlag}`
    ] = firebase.database.ServerValue.increment(1);
    firebase
      .database()
      .ref()
      .update(updates);
  },

  refreshCurrentExerciseStadistics: function(folderId, exerciseId) {
    return app
      .database()
      .ref(`folders/${folderId}/exercises/${exerciseId}/stadistics`)
      .once("value");
  },

  parseExercices(folders) {
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
          folderId: idFolder,
        });
      }
      result.push(newFolder);
    }
    return result;
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
