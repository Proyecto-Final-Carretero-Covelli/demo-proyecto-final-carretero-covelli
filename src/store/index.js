import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";
import { firebaseUtils } from "../db/firebase";

const CONSTANTS = {
  TEST_FLAG_INFO: {
    PASSED: {
      img: require("../assets/passed-icon.svg"),
      tooltip: "Test pasado correctamente",
    },

    NOT_PASSED: {
      img: require("../assets/not-passed-icon.svg"),
      tooltip: "Test no pasado",
    },

    NOT_EXECUTED: {
      img: require("../assets/not-executed-icon.svg"),
      tooltip: "Test aún no ejecutado",
    },
  },
};

// import {
//    declaredVariables,
// } from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    // declaredVariables: declaredVariables,

    title: "Título / Consigna",
    resizeTitle: null,
    titleText: "",
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
    implementationEditor: "",
    variablesEditor: "",
    declaredVariables: [],
    firebaseUtils: firebaseUtils,
    currentExercise: {},
    currentUser: undefined,
    folders: [],
    exercises: [],
  },
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    getResizeTitle: (state) => {
      return state.resizeTitle;
    },
    getTitleText: (state) => {
      return state.titleText;
    },
    getImplementationEditor: (state) => {
      return state.implementationEditor;
    },
    getDeclaredVariables: (state) => {
      return state.declaredVariables;
    },
    getVariablesEditor: (state) => {
      return state.variablesEditor;
    },
    getFirabaseUtils: (state) => {
      return state.firebaseUtils;
    },
    getCurrentExercise: (state) => {
      return state.currentExercise;
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getConstants: () => {
      return CONSTANTS;
    },
    getFolders: (state) => {
      return state.folders;
    },
    getExercices: (state) => {
      return state.exercises;
    },
  },

  mutations: {
    setImplementationEditor: (state, newValue) => {
      state.implementationEditor = newValue;
    },
    setResizeTitle: (state, newValue) => {
      state.resizeTitle = newValue;
    },
    toggleTitleShow: (state) => {
      if (state.resizeTitle.percent > 1) {
        state.resizeTitle.percent = 0;
      } else {
        state.resizeTitle.percent = 20;
      }
    },
    setDeclaredVariables: (state, newValue) => {
      state.declaredVariables = newValue;
    },
    setVariablesEditor: (state, newValue) => {
      state.variablesEditor = newValue;
    },
    setCurrentExercise: (state, value) => {
      state.currentExercise = value;
    },
    setTitle: (state, title) => {
      state.title = title;
    },
    setTitleText: (state, titleText) => {
      state.titleText = titleText;
    },
    setCurrentUser: (state, user) => {
      state.currentUser = user;
    },
    setFolders: (state, newFolders) => {
      state.folders = newFolders;
    },
    setExercices: (state, newExercices) => {
      state.exercises = newExercices;
    },
  },

  actions: {
    play: (context, runInSlowMode) => {
      function setVariables() {
        context.commit(
          "setDeclaredVariables",
          context.state.debugger.getVariables()
        );
      }

      const code =
        context.state.variablesEditor + context.state.implementationEditor;

      context.state.debugger = new Debugger(code);

      if (runInSlowMode) {
        return context.state.debugger.runSlowMode(setVariables);
      } else {
        return context.state.debugger.runAllCode();
      }
    },

    createInfoDialog: (context, modalInfo) => {
      modalInfo.modal.show("dialog", {
        title: modalInfo.title,
        text: modalInfo.msg,
        buttons: [
          {
            title: "Close",
            handler: () => {
              modalInfo.modal.hide("dialog");
            },
          },
        ],
      });
    },

    updateExercices: (context) => {
      context.state.firebaseUtils.getFolders().then(function(data) {
        context.commit(
          "setExercices",
          firebaseUtils.parseExercices(data.val())
        );
      });
    },

    updateFolders: (context) => {
      console.log("UPDATE FOLDERS");
      context.state.firebaseUtils.getFolders().then(function(data) {
        context.commit("setFolders", firebaseUtils.parseFolders(data.val()));
      });
    },
  },
});
