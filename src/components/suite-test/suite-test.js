import { firebaseUtils } from "../../db/firebase";
import _ from "lodash";

export default {
  methods: {
    selectTest(test) {
      this.$store.commit("setVariablesEditor", test.test);
    },

    onPlayTestClicked(test, evt) {
      if (evt) {
        evt.stopPropagation();
      }

      this.$store.commit("setVariablesEditor", test.test);

      const TEST_FLAG_INFO = this.$store.getters.getConstants.TEST_FLAG_INFO;

      this.$store.dispatch("play").then((result) => {
        if (test.result == "resultIsAnEmptyArray-VIDE") {
          if (Array.isArray(result) && result.length == 0) {
            test.imgInfo = TEST_FLAG_INFO.PASSED;
          } else {
            test.imgInfo = TEST_FLAG_INFO.NOT_PASSED;
          }
        } else {
          if (_.isEqual(result, test.result)) {
            test.imgInfo = TEST_FLAG_INFO.PASSED;
          } else {
            test.imgInfo = TEST_FLAG_INFO.NOT_PASSED;
          }
        }

        const testHasPassed =
          test.imgInfo === TEST_FLAG_INFO.PASSED ? "passed" : "notPassed";

        firebaseUtils.updateUserStatistics(
          testHasPassed,
          this._getValueToUpdateUserStatistics(testHasPassed)
        );

        const currentExercise = this.$store.getters.getCurrentExercise;
        firebaseUtils.updateExerciseStadistics(
          testHasPassed,
          currentExercise.folderId,
          currentExercise.id
        );

        this.$store.dispatch("refreshCurrentExerciseStadistics");
        this.$forceUpdate();
      });
    },

    _getValueToUpdateUserStatistics(testHasPassed) {
      const currentUser = this.$store.getters.getCurrentUser;

      let valueToUpdate = 0;
      if (currentUser.statistics) {
        if (testHasPassed) {
          valueToUpdate = currentUser.statistics.passed || 0;
          currentUser.statistics.passed = valueToUpdate + 1;
        } else {
          valueToUpdate = currentUser.statistics.notPassed || 0;
          currentUser.statistics.notPassed = valueToUpdate + 1;
        }
      } else {
        if (testHasPassed) {
          currentUser.statistics = { passed: valueToUpdate + 1 };
        } else {
          currentUser.statistics = { notPassed: valueToUpdate + 1 };
        }
      }

      this.$store.commit("setCurrentUser", currentUser);
      return valueToUpdate + 1;
    },

    onRunAllTestsClicked: function() {
      const tests = this.$store.getters.getCurrentExercise.suiteTest;
      tests.forEach((test) => {
        this.onPlayTestClicked(test);
      });
    },
  },
};
