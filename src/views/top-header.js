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
      Object.keys(exercise.suiteTest).forEach(testId => {
        this._setTestFlagIconInfo(exercise.suiteTest[testId], exercise);
      });

      this.$store.commit('setCurrentExercise', exercise);
      this.$store.commit('setTitle', exercise.name);
      this.$store.commit('setTitleText', exercise.statement);
    },

    _setTestFlagIconInfo(test, exercise) {

      const TEST_FLAG_INFO = this.$store.getters.getConstants.TEST_FLAG_INFO;

      const currentUser = this.$store.getters.getCurrentUser;
      const currentExercise = exercise;

      if (currentUser.history) {

        const exerciseHistory = currentUser.history[currentExercise.id];
        if (exerciseHistory) {
          const userExerciseHistoryInfo = this._getUserExerciseHistoryInfo(exerciseHistory, test);
          test.imgInfo = userExerciseHistoryInfo.imgInfo;
          test.historyId = userExerciseHistoryInfo.historyId;
          return;
        }
      }

      test.imgInfo = TEST_FLAG_INFO.NOT_EXECUTED;
      
    },

    _getUserExerciseHistoryInfo(exerciseHistory, test) {
      const TEST_FLAG_INFO = this.$store.getters.getConstants.TEST_FLAG_INFO;
      const passedTests = exerciseHistory.passedTests || {};
      const notPassedTests = exerciseHistory.notPassedTests || {};

      const passedTestId = Object.keys(passedTests).find(passedTestKey => 
        passedTests[passedTestKey] === test.name
      );

      if (passedTestId) {
        return {imgInfo: TEST_FLAG_INFO.PASSED, historyId: passedTestId};
      } else {
        const notPassedTestId = Object.keys(notPassedTests).find(notPassedTestKey => 
          notPassedTests[notPassedTestKey] === test.name
        );

        if (notPassedTestId) {
          return {imgInfo: TEST_FLAG_INFO.NOT_PASSED, historyId: notPassedTestId };
        }
      }

      return {imgInfo: TEST_FLAG_INFO.NOT_EXECUTED};
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
    });
  }
};
