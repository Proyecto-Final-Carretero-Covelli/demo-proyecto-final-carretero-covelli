export default {
  methods: {
    toggleTitleShow() {
      this.$store.commit("toggleTitleShow");
    },

    closeExercise() {
      this.$store.dispatch("closeExercise");
    },
  },

  mounted() {},
};
