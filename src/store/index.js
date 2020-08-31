import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";
import { db } from "../db/firebase";

// import {
//   declaredVariables,
//   declaredArrays,
// } from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Título / Consigna",
    implementationEditor: "",
    variablesEditor: "",
    parsedNodes: [],
    debugger: undefined,
    declaredVariables: [],
    declaredArrays: [],
    db: db
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    // declaredVariables: declaredVariables,
    // declaredArrays: declaredArrays,
  },
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    getCount: (state) => {
      return state.count;
    },
    getImplementationEditor: (state) => {
      return state.implementationEditor;
    },
    getDeclaredVariables: (state) => {
      return state.declaredVariables;
    },
    getDeclaredArrays: (state) => {
      return state.declaredArrays;
    },
    getVariablesEditor: (state) => {
      return state.variablesEditor;
    },
    getDb: (state) => {
      return state.db;
    }
  },

  mutations: {
    setImplementationEditor: (state, newValue) => {
      state.implementationEditor = newValue;
    },
    getDeclaredVariables: (state, newValue) => {
      state.declaredVariables = newValue;
    },
    setVariablesEditor: (state, newValue) => {
      state.variablesEditor = newValue;
    }
  },

  actions: {
    play: (context) => {

      const code = context.state.variablesEditor + context.state.implementationEditor;

      context.state.debugger = new Debugger(code);
      
      context.state.debugger.runAllCode();
      context.commit(
        "getDeclaredVariables",
        context.state.debugger.getVariables()
      );

    },

    addTest: (context, testNumber) => {

      let editorContent;

      switch(testNumber) {
        case "Test 1":
          editorContent = 'let x = 10; const y = 20;';
          break;
        case "Test 2":
          editorContent = 'let x = -20; const y = 20;';
          break;
        case "Test 3":
          editorContent = 'let x = 15.4; const y = 22.1;';
          break;
      }

      context.state.variablesEditor = editorContent;
    }

  },
});
