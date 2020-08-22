import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    title: "Título / Consigna",
    count: 5,
  },
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    getCount: (state) => {
      return state.count;
    },
  },
});
