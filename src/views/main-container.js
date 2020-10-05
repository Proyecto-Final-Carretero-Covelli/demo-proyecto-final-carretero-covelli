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
    if (!currentUser) {
      this.$modal.show("login-modal");
      this.$bvModal.show("modal-login");
    }
  },
  methods: {
    login() {
      const modal = this.$modal;

      firebaseUtils
        .loginWithGoogle()
        .then(() => {
          firebaseUtils.getCurrentUser().then((user) => {
            if (!user.val()) {
              firebaseUtils.addUser().then(() => modal.hide("login-modal"));
            } else {
              modal.hide("login-modal");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
