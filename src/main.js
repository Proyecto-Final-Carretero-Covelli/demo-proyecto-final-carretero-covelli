import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import splitPane from "vue-splitpane";
import VueKonva from "vue-konva";
import store from "./store";
import {firebaseUtils} from './db/firebase';
import VModal from 'vue-js-modal';

//Icons
import { faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueKonva);
Vue.use(VModal, {dialog: true});

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("split-pane", splitPane);

//added Icons
library.add(faAngellist);
library.add(faCog);
library.add(faChartBar);
library.add(faLifeRing);
library.add(faPlay);
library.add(faStop);
library.add(faAngleUp);
library.add(faAngleDown);
library.add(faUser);

function initApp() {
  new Vue({
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

firebaseUtils.auth.onAuthStateChanged((user) => {

  if (user) {
    firebaseUtils.getCurrentUser().then((data) => {
      const currentUser = data.val();
  
      if (currentUser) {
        store.commit('setCurrentUser', currentUser);
      } 
      initApp();
  
    });
  } else {
    initApp();
  }

});
