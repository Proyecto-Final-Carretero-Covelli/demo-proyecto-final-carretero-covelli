import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import { Debugger } from "../debugger/debugger.js";

import {
  declaredVariables,
  declaredArrays,
} from "../mocks/structures-from-parsed-code";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Título / Consigna",
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
    declaredVariables: declaredVariables,
    declaredArrays: declaredArrays,
  },
  getters: {
    getTitle: (state) => {
      return state.title;
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
  },

  mutations: {
    setEditorContent: (state, newValue) => {
      state.editorContent = newValue;
    },
  },

  actions: {
    play: (context) => {
      if (!context.state.debugger) {
        context.state.debugger = new Debugger(context.state.editorContent);
      }
      context.state.debugger.next();
    },
  },
});
