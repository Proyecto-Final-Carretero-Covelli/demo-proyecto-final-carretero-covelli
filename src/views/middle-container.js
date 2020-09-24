import Konva from "../components/konva/konva.vue";
import {firebaseUtils} from '../db/firebase';

export default {
  components: { aceeditor: require("vue2-ace-editor"), Konva },

  data: function() {
    return {};
  },

  methods: {

    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/typescript"); //language
      require("brace/mode/less");
      require("brace/theme/dracula");
      require("brace/snippets/typescript");
      require("brace/snippets/javascript"); //snippet
    },

    selectTest(test) {
      this.$store.commit('setVariablesEditor', test.test);
    },

    onPlayTestClicked(test, evt) {
      if (evt) {
        evt.stopPropagation();
      }

      this.$store.commit("setVariablesEditor", test.test);

      const TEST_FLAG_INFO = this.$store.getters.getConstants.TEST_FLAG_INFO;
      const oldInfo = {
        passedBefore: test.imgInfo === TEST_FLAG_INFO.PASSED,
        historyId: test.historyId
      };    
      const currentExercise = this.$store.getters.getCurrentExercise;

      this.$store.dispatch('play').then((result) => {
        if (result === test.result) {
          test.imgInfo = TEST_FLAG_INFO.PASSED;
        } else {
          test.imgInfo = TEST_FLAG_INFO.NOT_PASSED;
        }

        const testHasPassed = test.imgInfo === TEST_FLAG_INFO.PASSED;
        firebaseUtils.addTestToHistory(currentExercise.id, testHasPassed, test, oldInfo);    
        firebaseUtils.updateUserStatistics(testHasPassed, this._getValueToUpdateUserStatistics(testHasPassed));

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
          currentUser.statistics = {passed: valueToUpdate + 1};
        } else {
          currentUser.statistics = {notPassed: valueToUpdate + 1};
        }
      }

      this.$store.commit('setCurrentUser', currentUser);
      return valueToUpdate+1;
    },

    onRunAllTestsClicked: function() {
      const tests = this.$store.getters.getCurrentExercise.suiteTest;
      tests.forEach((test) => {
        this.onPlayTestClicked(test);
      });   
    }

  },

  computed: {
    implementationEditor: {
      get() {
        return this.$store.getters.getImplementationEditor;
      },
      set(newValue) {
        this.$store.commit("setImplementationEditor", newValue);
      },
    },

    variablesEditor: {
      get() {
        return this.$store.getters.getVariablesEditor;
      },
      set(newValue) {
        this.$store.commit("setVariablesEditor", newValue);
      },
    },

    
  },

  mounted() {
    this.$store.commit("setResizeTitle", this.$refs.resizeTitle);

    let variablesEditor = this.$refs.myVariablesEditor.editor;
    let implementationEditor = this.$refs.myImplementationEditor.editor;
    variablesEditor.setShowPrintMargin(false);
    implementationEditor.setShowPrintMargin(false);
  },
};
