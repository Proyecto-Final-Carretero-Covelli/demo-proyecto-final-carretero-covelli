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

    this.$bvToast.toast(
      `La funciones de "creación de ejercicios" y "estadísticas" fueron deshabilitadas con el objetivo de preservar el experimento realizado para el Trabajo Final 
    la carrera de Ingeniería de Sistemas UNICEN - Carretero-Covelli`,
      {
        title: " ⚠ Advertencia ⚠",
        variant: "warning",
        solid: true,
        autoHideDelay: 1000000,
      }
    );
  },
};
