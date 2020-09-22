export default {
  components: { aceeditor: require("vue2-ace-editor") },

  data() {
    return {
      title: "",
      initialCode: "",
      solutionCode: "",
      currentTestName: "",
      currentTestCode: "",
      currentIndexTest: -1,
      tests: [{ name: "Test Name 1", test: "var = x" }],
      editTestMode: false,
    };
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

    addTest: function() {
      if (this.currentTestName !== "") {
        this.tests = [
          ...this.tests,
          { name: this.currentTestName, test: this.currentTestCode },
        ];
        this.currentTestCode = "";
        this.currentTestName = "";
      }
    },

    showTest: function(indexTest) {
      this.currentTestName = this.tests[indexTest]["name"];
      this.currentTestCode = this.tests[indexTest]["test"];
      this.editTestMode = true;
      this.currentIndexTest = indexTest;
    },

    deleteTest: function(indexTest) {
      this.tests.splice(indexTest, 1);
      if (this.currentIndexTest == indexTest) {
        this.currentIndexTest = -1;
        this.currentTestCode = "";
        this.currentTestName = "";
        this.editTestMode = false;
      }
    },

    cancelEdit: function() {
      this.currentTestCode = "";
      this.currentTestName = "";
      this.editTestMode = false;
    },

    saveEdit: function() {
      if (this.currentTestName !== "") {
        this.tests.splice(this.currentIndexTest, 1, {
          name: this.currentTestName,
          test: this.currentTestCode,
        });
        this.currentIndexTest = -1;
        this.currentTestName = "";
        this.currentTestCode = "";
      }
    },
  },

  mounted() {},
};
