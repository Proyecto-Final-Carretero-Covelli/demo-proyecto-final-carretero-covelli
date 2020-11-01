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
      this.$store.commit(
        "setImplementationEditor",
        this.$store.getters.getCurrentExercise.initialCode +
          "\n\n" +
          this.$store.getters.getCurrentExercise.solution
      );
    },
  },
};
