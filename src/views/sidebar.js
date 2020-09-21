import NewExercise from "../components/modals/new-exercise/new-exercise.vue";

export default {
  components: { NewExercise },

  methods: {
    openModelNewExercise() {
      this.$bvModal.show("modal-new-exercise");
    },
  },
};
