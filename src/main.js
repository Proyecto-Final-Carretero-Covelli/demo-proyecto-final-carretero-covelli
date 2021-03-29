import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import splitPane from "vue-splitpane";
import VueKonva from "vue-konva";
import store from "./store";
import { firebaseUtils } from "./db/firebase";
import VModal from "vue-js-modal";

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
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueKonva);
Vue.use(VModal, { dialog: true });

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
library.add(faPlusSquare);
library.add(faSearch);
library.add(faTrashAlt);
library.add(faInfoCircle);
library.add(faTimes);
library.add(faCheck);
library.add(faBan);
library.add(faSquare);
library.add(faGoogle);
library.add(faBug);
library.add(faArrowRight);
library.add(faClock);

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
        store.commit("setCurrentUser", currentUser);
        initApp();
      } else {
        firebaseUtils.addUser().then((user) => {
          store.commit("setCurrentUser", user);
          initApp();
        });
      }

    });
  } else {
    initApp();
  }
});
