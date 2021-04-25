export default {
  data: function() {
    return {
      tooltipDelay: { show: 200, hide: 0 },
    };
  },
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
