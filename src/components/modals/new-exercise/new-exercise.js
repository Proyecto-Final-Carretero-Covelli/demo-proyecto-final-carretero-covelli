import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { aceeditor: require("vue2-ace-editor"), Treeselect },

  data() {
    return {
      title: "",
      statement: "",
      initialCode: "",
      solutionCode: "",
      currentTestName: "",
      currentTestCode: "",
      currentIndexTest: -1,
      tests: [],
      editTestMode: false,
      folder: "",

      searchActive: false,
    };
  },

  computed: {
    options() {
      return this.$store.getters.getFolders;
    },

    filterItems() {
      return this.$store.getters.getFolders.filter((folder) => {
        if (
          this.folder !== undefined &&
          this.folder !== "" &&
          this.folder !== " " &&
          folder !== undefined
        ) {
          let comparacion = folder.label
            .toLowerCase()
            .includes(this.folder.toLowerCase());
          console.log(comparacion, this.folder, folder.label);
          return comparacion;
        }
        return false;
      });
    },
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

    searchFolder() {
      this.searchActive = !this.searchActive;
    },

    selectFolder(label) {
      this.folder = label;
      this.searchActive = false;
    },

    resetModal() {
      this.title = "";
      this.statement = "";
      this.initialCode = "";
      this.solutionCode = "";
      this.currentTestName = "";
      this.currentTestCode = "";
      this.currentIndexTest = -1;
      this.tests = [];
      this.editTestMode = false;
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

    handleOk: function() {
      //Enviar mediante el método de addFolder() y addExercise() los datos correspondientes
      if (
        // this.title !== "" &&
        // this.statement !== "" &&
        // this.solutionCode !== "" &&
        this.folder !== ""
      ) {
        // const exercises = {
        //   name: this.title,
        //   statement: this.statement,
        //   solution: this.solution,
        // };

        // Pendiente de definición para el "result" de la suite de test

        const firebaseUtils = this.$store.getters.getFirabaseUtils;
        firebaseUtils.addFolder({ name: this.folder });
        firebaseUtils.addExercise();
      } else {
        console.log("ERROR CAMPOS IMCOMPLETOS !");
      }
    },
  },

  mounted() {
    // this.$root.$on("bv::modal::show", () => {
    //   this.resetModal();
    // });
    // this.$root.$on("bv::modal::shown", () => {
    //   this.$refs.testCodeEditor.editor.setShowPrintMargin(false);
    //   this.$refs.solutionCodeEditor.editor.setShowPrintMargin(false);
    //   this.$refs.initialCodeEditor.editor.setShowPrintMargin(false);
    // });
  },
};
