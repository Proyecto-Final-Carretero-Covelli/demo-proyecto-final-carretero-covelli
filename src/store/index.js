import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";
import { firebaseUtils } from "../db/firebase";

// import {
//    declaredVariables,
// } from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    // declaredVariables: declaredVariables,
    currentExercise: {},
    currentUser: undefined
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
    }
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
    }
  },

  actions: {
    play: (context) => {
      const code =
        context.state.variablesEditor + context.state.implementationEditor;

      context.state.debugger = new Debugger(code);

      context.state.debugger.runSlowMode(setVariables);

      function setVariables() {
        context.commit(
          "setDeclaredVariables",
          context.state.debugger.getVariables()
        );
      }

    },

    addTest: (context, testNumber) => {
      let editorContent;

      switch (testNumber) {
        case "Test 1":
          editorContent = "let x = 10; const y = 20;";
          break;
        case "Test 2":
          editorContent = "let x = -20; const y = 20;";
          break;
        case "Test 3":
          editorContent = "let x = 15.4; const y = 22.1;";
          break;
      }

      context.state.variablesEditor = editorContent;
    },
  },
});
