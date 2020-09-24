import NewExercise from "../components/modals/new-exercise/new-exercise.vue";
import Search from "../components/modals/search/search.vue";

export default {
  components: { NewExercise, Search },

  methods: {
    openModalNewExercise() {
      this.$bvModal.show("modal-new-exercise");
    },

    openModalSeach() {
      this.$bvModal.show("modal-search");
    },

    seeSolution() {
      this.$store.commit(
        "setImplementationEditor",
        this.$store.getters.getCurrentExercise.solution
      );
    },
  },
};
