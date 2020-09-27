import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

//import { exercicesDataBase } from "../../../mocks/exercices-data-base";

export default {
  components: { Treeselect },
  data: function() {
    return {
      folders: undefined,
      value: null,
    };
  },

  computed: {
    options() {
      return this.$store.getters.getFolders;
    },
  },

  methods: {
    toggleTitleShow() {
      this.$store.commit("toggleTitleShow");
    },

    selectExercise(selectedExercise) {
      let exercise = selectedExercise.exercise;
      Object.keys(exercise.suiteTest).forEach((testId) => {
        this._setTestFlagIconInfo(exercise.suiteTest[testId], exercise);
      });

      this.$store.commit("setCurrentExercise", exercise);
      this.$store.commit("setTitle", exercise.name);
      this.$store.commit("setTitleText", exercise.statement);

      this.$bvModal.hide("modal-search");
    },

    _setTestFlagIconInfo(test, exercise) {
      const TEST_FLAG_INFO = this.$store.getters.getConstants.TEST_FLAG_INFO;

      const currentUser = this.$store.getters.getCurrentUser;
      const currentExercise = exercise;

      if (currentUser.history) {
        const exerciseHistory = currentUser.history[currentExercise.id];
        if (exerciseHistory) {
          const userExerciseHistoryInfo = this._getUserExerciseHistoryInfo(
            exerciseHistory,
            test
          );
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

      const passedTestId = Object.keys(passedTests).find(
        (passedTestKey) => passedTests[passedTestKey] === test.name
      );

      if (passedTestId) {
        return { imgInfo: TEST_FLAG_INFO.PASSED, historyId: passedTestId };
      } else {
        const notPassedTestId = Object.keys(notPassedTests).find(
          (notPassedTestKey) => notPassedTests[notPassedTestKey] === test.name
        );

        if (notPassedTestId) {
          return {
            imgInfo: TEST_FLAG_INFO.NOT_PASSED,
            historyId: notPassedTestId,
          };
        }
      }

      return { imgInfo: TEST_FLAG_INFO.NOT_EXECUTED };
    },

    // parseFolders(folders) {
    //   let result = [];
    //   for (const idFolder in folders) {
    //     let folder = folders[idFolder];
    //     let newFolder = {
    //       id: idFolder,
    //       label: folder["name"],
    //       children: [],
    //     };
    //     for (const idExercise in folder["exercises"]) {
    //       let exercise = folder["exercises"][idExercise];
    //       newFolder["children"].push({
    //         id: exercise["id"],
    //         label: exercise["name"],
    //         exercise: exercise,
    //       });
    //     }
    //     result.push(newFolder);
    //   }
    //   return result;
    // },
  },

  mounted() {
    // let self = this;
    // const firebaseUtils = this.$store.getters.getFirabaseUtils;
    // firebaseUtils.getFolders().then(function(data) {
    //   self.folders = data.val();
    //   self.options = self.parseFolders(data.val());
    // });
  },
};
