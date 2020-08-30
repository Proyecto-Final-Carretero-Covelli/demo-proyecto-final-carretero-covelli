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
    titleShow: false,
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
    // declaredVariables: [],
    // declaredArrays: [],
    // - Visualización Mock Variables y Arreglos - (Descomentar el correspondiente import from 'mocks')
    declaredVariables: declaredVariables,
    declaredArrays: declaredArrays,
    resize: null,
  },
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    isTitleShow: (state) => {
      return state.titleShow;
    },
    getCount: (state) => {
      return state.count;
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
    getResize: (state) => {
      return state.resize;
    },
  },

  mutations: {
    setEditorContent: (state, newValue) => {
      state.editorContent = newValue;
    },
    toggleTitleShow: (state) => {
      state.titleShow = !state.titleShow;
    },
    setDeclaredVariables: (state, newValue) => {
      state.declaredVariables = newValue;
    },
    setResize: (state, newValue) => {
      state.resize = newValue;
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
