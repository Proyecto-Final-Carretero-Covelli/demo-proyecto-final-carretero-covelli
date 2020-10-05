import { firebaseUtils } from "../../../db/firebase";

export default {
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
          this.$bvModal.hide("modal-login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
