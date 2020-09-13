export default {

  data: function() {
    return {
      folders: undefined
    };
  },

  methods: {

    toggleTitleShow() {
      this.$store.commit("toggleTitleShow");
    },

    selectExercise(exercise) {
      this.$store.commit('setCurrentExercise', exercise);
      this.$store.commit('setTitle', exercise.name);
      this.$store.commit('setTitleText', exercise.statement);
    },

    selectTest(test) {
      this.$store.commit('setVariablesEditor', test.test);
    },

    seeSolution() {
      this.$store.commit('setImplementationEditor', this.$store.getters.getCurrentExercise.solution);
    }

  },

  mounted() {
    let self = this;
    const firebaseUtils = this.$store.getters.getFirabaseUtils;

    firebaseUtils.getFolders().then(function(data) {
      self.folders = data.val();
      console.log(self.folders);
    });
  }
};
