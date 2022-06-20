import NewExercise from "../components/modals/new-exercise/new-exercise.vue";
import Search from "../components/modals/search/search.vue";
import Account from "../components/modals/account/account.vue";
import Clue from "../components/modals/clue/clue.vue";
import Analytics from "../components/modals/analytics/analytics.vue";

// const ADMIN_USERS = ["santii.carre@gmail.com", "covellitomas@gmail.com"];

export default {
  components: { NewExercise, Search, Account, Clue, Analytics },

  computed: {
    cluesOrSolution() {
      return (
        this.$store.getters.getTitle &&
        (!!this.$store.getters.getCurrentExercise.clue ||
          !!this.$store.getters.getCurrentExercise.solution)
      );
    },
    selectedExerciseStatistics() {
      return (
        this.$store.getters.getTitle &&
        !!this.$store.getters.getCurrentExerciseStatistics
      );
    },
    isAdminUser() {
      // Disabled feature for demo
      return true;
      // return (
      //   this.$store.getters.getCurrentUser &&
      //   ADMIN_USERS.includes(this.$store.getters.getCurrentUser.email)
      // );
    },
  },

  methods: {
    openModalNewExercise() {
      if (this.isAdminUser) {
        this.$bvModal.show("modal-new-exercise");
        this.$store.dispatch("updateFolders");
      }
    },

    openModalSearch() {
      this.$bvModal.show("modal-search");
      this.$store.dispatch("updateExercices");
    },

    openModalAccount() {
      this.$bvModal.show("modal-account");
    },

    openModalAnalytics() {
      if (this.selectedExerciseStatistics) {
        this.$bvModal.show("modal-analytics");
        this.$store.dispatch("refreshCurrentExerciseStatistics");
      }
    },

    seeSolution() {
      if (this.$store.getters.getTitle) {
        if (
          !!this.$store.getters.getCurrentExercise.clue ||
          !!this.$store.getters.getCurrentExercise.solution
        ) {
          this.$bvModal.show("modal-clue");
        } else {
          this.$bvToast.toast("Ejercicio sin solución y/o pistas ", {
            title: "🙈🙉🙊",
            variant: "info",
            solid: true,
            bodyClass: "new-exercise__toast-error--body",
            headerClass: "new-exercise__toast-error--header",
            autoHideDelay: 2000,
          });
        }
      } else {
        this.$bvToast.toast("Utilice la 🔍 para buscar ejercicios.", {
          title: "Seleccione un ejercicio",
          variant: "info",
          solid: true,
          bodyClass: "new-exercise__toast-error--body",
          headerClass: "new-exercise__toast-error--header",
          autoHideDelay: 2000,
        });
      }
    },

    downloadCode() {
      function download(filename, text) {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", "VIDE" + filename + ".txt");
        element.click();
      }

      function getState(state) {
        switch (state) {
          case "not-passed":
            return "rechazado";
          case "passed":
            return "pasado correctamente";
          case "not-executed":
            return "aún no ejecutado";
        }
      }

      const currentExercise = this.$store.getters.getCurrentExercise;
      let text =
        "/* Consigna:\n" +
        (currentExercise.statement || "") +
        "   */" +
        "\n\n" +
        (this.$store.getters.getVariablesEditor || "") +
        "\n\n\n" +
        (this.$store.getters.getImplementationEditor || "");

      if (currentExercise.suiteTest && currentExercise.suiteTest.length) {
        text += "\n\n/* Reporte de Tests:\n";
        currentExercise.suiteTest.forEach((test) => {
          text += test.name + ": " + getState(test.imgInfo.state) + "\n";
        });
        text += "*/";
      }

      const filename = currentExercise.name ? " - " + currentExercise.name : "";

      download(filename, text);
    },
  },
};
