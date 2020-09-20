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

    const currentUser = this.$store.getters.getCurrentUser;
    if (!currentUser) {
      this.$modal.show('login-modal');
    }
    
  },
  methods: {

    login() {
      firebaseUtils.loginWithGoogle().then(() => {
        firebaseUtils.getCurrentUser().then((user) => {
          if (!user) {
            firebaseUtils.addUser();
          }
        })  
        this.$modal.hide('login-modal');
      }).catch((error) => {
        console.log(error);
      });
    }

  }
};
