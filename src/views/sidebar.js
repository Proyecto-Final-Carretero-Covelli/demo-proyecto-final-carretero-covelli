import NewExercise from "../components/modals/new-exercise/new-exercise.vue";
import Search from "../components/modals/search/search.vue";
import Account from "../components/modals/account/account.vue";

export default {
  components: { NewExercise, Search, Account },

  methods: {
    openModalNewExercise() {
      this.$bvModal.show("modal-new-exercise");
      this.$store.dispatch("updateFolders");
    },

    openModalSeach() {
      this.$bvModal.show("modal-search");
      this.$store.dispatch("updateExercices");
    },

    openModalAccount() {
      this.$bvModal.show("modal-account");
    },

    seeSolution() {
      const solution = this.$store.getters.getCurrentExercise.initialCode ?
        (this.$store.getters.getCurrentExercise.initialCode +
        "\n\n" +
        this.$store.getters.getCurrentExercise.solution) :
        this.$store.getters.getCurrentExercise.solution;

      this.$store.commit("setImplementationEditor", solution);
    },

    downloadCode() {
      function download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "VIDE" + filename + ".txt");
        element.click();
      }

      function getState(state) {
        switch (state) {
          case 'not-passed':
            return 'rechazado';
          case 'passed':
            return 'pasado correctamente';
          case 'not-executed':
            return 'aún no ejecutado';
        }
      }
    
      const currentExercise = this.$store.getters.getCurrentExercise;
      let text = 
        "Consigna:\n" +
        (currentExercise.statement || "") +
        "\n\nDeclaración:\n" +
        (this.$store.getters.getVariablesEditor || "") + 
        "\n\nImplementación:\n" + 
        (this.$store.getters.getImplementationEditor || "");

      if (currentExercise.suiteTest && currentExercise.suiteTest.length) {
        text += "\n\nReporte de Tests:\n"
        currentExercise.suiteTest.forEach(test => {
          text += (test.name + ": " + getState(test.imgInfo.state) + "\n");
        });
      }

      const filename = currentExercise.name ? " - " + currentExercise.name  : "";
      
      download(filename, text);

    }

  },
};
