import Sidebar from "./sidebar.vue";
import TopHeader from "./top-header.vue";
import MiddleContainer from "./middle-container.vue";
import Login from "../components/modals/login/login.vue";
import { firebaseUtils } from "../db/firebase";

export default {
  components: {
    TopHeader,
    Sidebar,
    MiddleContainer,
    Login,
  },
  mounted() {
    const currentUser = this.$store.getters.getCurrentUser;

    firebaseUtils.getCurrentUser().then((user) => {
      if (!user && !currentUser) {
        this.$bvModal.show("modal-login");
      }
    });

  },
};
