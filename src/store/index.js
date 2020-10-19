import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";
import { firebaseUtils } from "../db/firebase";

// import {
//    declaredVariables,
// } from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

const CONSTANTS = {
  TEST_FLAG_INFO: {
    PASSED: {
      state: "passed",
      tooltip: "Test pasado correctamente",
    },

    NOT_PASSED: {
      state: "not-passed",
      tooltip: "Test no pasado",
    },

    NOT_EXECUTED: {
      state: "not-executed",
      tooltip: "Test aún no ejecutado",
    },
  },
};

export default new Vuex.Store({
  state: {
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    // declaredVariables: declaredVariables,

    title: null,
    resizeTitle: null,
    titleText: "",
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
    implementationEditor: "",
    variablesEditor: "",
    implementationAceEditor: null,
    variablesAceEditor: null,
    declaredVariables: [],
    firebaseUtils: firebaseUtils,
    currentExercise: {},
    currentUser: undefined,
    folders: [],
    exercises: [],
    isRunningCode: false,
    isDebugging: false,
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
    isRunningCode: (state) => {
      return state.isRunningCode;
    },
    isDebugging: (state) => {
      return state.isDebugging;
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
    setImplementationAceEditor: (state, value) => {
      state.implementationAceEditor = value;
    },
    setVariablesAceEditor: (state, value) => {
      state.variablesAceEditor = value;
    },
    setRunningCode: (state, isRunning) => {
      state.isRunningCode = isRunning;
    },
  },

  actions: {
    signOut: (context) => {
      context.commit("setCurrentUser", undefined);
      context.state.firebaseUtils.signOut();
    },

    generateTestResult: (context, customContext) => {
      console.log("CUSTOM CONTEXT", customContext);
      const debug = new Debugger(customContext);
      const result = debug.runAllCode();
      return result ? result.value : null;
    },

    play: (context) => {
      if (context.state.isDebugging) {
        return context.state.debugger.finishDebugMode();
      }

      const debug = new Debugger(context);
      const result = debug.runAllCode();

      if (result) {
        context.commit("setDeclaredVariables", result.context.variables);
      }

      return result ? result.value : null;
    },

    stop: (context) => {
      context.state.debugger.stop();
      context.commit("setDeclaredVariables", []);
    },

    runInDebugMode: (context) => {
      context.state.debugger = new Debugger(context);
      context.state.debugger.runDebugMode();
    },

    nextStep: (context) => {
      context.state.debugger.next();
    },

    runInSlowMode: (context) => {
      const debug = new Debugger(context);

      context.state.isRunningCode = true;
      debug.runSlowMode();
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
