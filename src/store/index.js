import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";
import { db } from "../db/firebase";

import {
  declaredVariables,
  declaredArrays,
} from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Título / Consigna",
    resizeTitle: null,
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
    // declaredVariables: [],
    // declaredArrays: [],
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    declaredVariables: declaredVariables,
    declaredArrays: declaredArrays,
  },
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    getResizeTitle: (state) => {
      return state.resizeTitle;
    },
    getEditorContent: (state) => {
      return state.editorContent;
    },
    getDeclaredVariables: (state) => {
      return state.declaredVariables;
    },
    getDeclaredArrays: (state) => {
      return state.declaredArrays;
    },
  },

  mutations: {
    setEditorContent: (state, newValue) => {
      state.editorContent = newValue;
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
  },

  actions: {
    play: (context) => {
      if (!context.state.debugger) {
        context.state.debugger = new Debugger(context.state.editorContent);
      }
      context.state.debugger.runAllCode();
      context.commit(
        "getDeclaredVariables",
        context.state.debugger.getVariables()
      );
      const exercises = db.ref("exercises");

      exercises.once("value").then(function(snapshot) {
        console.log(snapshot.val());
      });

      if (this.editorContent) {
        db.ref("exercises").push({
          typescript: context.state.editorContent,
          javascript: "javascript code",
        });
      }
    },
  },
});
