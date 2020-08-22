import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import splitPane from "vue-splitpane";
import store from "./store";

//Icons
import { faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("split-pane", splitPane);

//added Icons
library.add(faAngellist);
library.add(faCog);
library.add(faChartBar);
library.add(faLifeRing);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
