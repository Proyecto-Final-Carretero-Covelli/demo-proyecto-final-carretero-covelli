import { firebaseUtils } from "../../../db/firebase";

export default {
  methods: {
    login() {

      firebaseUtils
        .loginWithGoogle()
        .then(() => {
          this.$bvModal.hide("modal-login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
