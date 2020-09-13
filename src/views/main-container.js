import Sidebar from "./sidebar.vue";
import TopHeader from "./top-header.vue";
import MiddleContainer from "./middle-container.vue";
import { firebaseUtils } from "../db/firebase";

export default {
  components: {
    TopHeader,
    Sidebar,
    MiddleContainer
  },
  mounted() {
    this.$modal.show('login-modal');
  },
  methods: {

    login() {
      firebaseUtils.loginWithGoogle().then(() => {
        this.$modal.hide('login-modal');
      }).catch((error) => {
        console.log(error);
      });
    }

  }
};
