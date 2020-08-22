import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
//import { Debugger } from "../debugger/debugger.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Título / Consigna",
    editorContent: "",
    parsedNodes: [],
    debugger: undefined,
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
  },

  mutations: {
    setEditorContent: (state, newValue) => {
      state.editorContent = newValue;
    },
  },
});
