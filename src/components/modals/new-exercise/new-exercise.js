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
      clue1: "",
      clueCode1: "",
      clue2: "",
      clueCode2: "",
      currentTestName: "",
      currentTestCode: "",
      currentIndexTest: -1,
      tests: [],
      editTestMode: false,
      folder: "",
      searchActive: false,
      loadingNewExercise: false,
    };
  },

  computed: {
    options() {
      return this.$store.getters.getFolders;
    },

    /* Filter folders */
    filterFolders() {
      return this.$store.getters.getFolders.filter((folder) => {
        if (
          this.folder !== undefined &&
          this.folder !== "" &&
          this.folder !== " " &&
          folder !== undefined
        ) {
          let comparation = folder.label
            .toLowerCase()
            .includes(this.folder.toLowerCase());
          return comparation;
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

    openSearchDropdown() {
      this.searchActive = true;
    },

    closeSearchDropdown() {
      this.searchActive = false;
    },

    searchFolder() {
      this.searchActive = !this.searchActive;
    },

    selectFolder(label) {
      this.folder = label;
      this.searchActive = false;
    },

    resetModal() {
      this.folder = "";
      this.title = "";
      this.statement = "";
      this.initialCode = "";
      this.solutionCode = "";
      this.currentTestName = "";
      this.currentTestCode = "";
      this.clue1 = "";
      this.clueCode1 = "";
      this.clue2 = "";
      this.clueCode2 = "";
      this.currentIndexTest = -1;
      this.tests = [];
      this.editTestMode = false;
      this.loadingNewExercise = false;
    },

    addTest() {
      if (this.currentTestName !== "" && this.currentTestCode !== "") {
        this.tests = [
          ...this.tests,
          { name: this.currentTestName, test: this.currentTestCode },
        ];
        this.currentTestCode = "";
        this.currentTestName = "";
      } else if (this.currentTestName === "") {
        this.showToastMissingTestName();
      } else {
        this.showToastMissingTestCode();
      }
    },

    showTest(indexTest) {
      this.currentTestName = this.tests[indexTest]["name"];
      this.currentTestCode = this.tests[indexTest]["test"];
      this.editTestMode = true;
      this.currentIndexTest = indexTest;
    },

    deleteTest(indexTest) {
      this.tests.splice(indexTest, 1);
      if (this.currentIndexTest === indexTest) {
        this.currentIndexTest = -1;
        this.currentTestCode = "";
        this.currentTestName = "";
        this.editTestMode = false;
      }
    },

    cancelEdit() {
      this.currentTestCode = "";
      this.currentTestName = "";
      this.editTestMode = false;
    },

    saveEdit() {
      if (this.currentTestName !== "" && this.currentTestCode !== "") {
        this.tests.splice(this.currentIndexTest, 1, {
          name: this.currentTestName,
          test: this.currentTestCode,
        });
        this.currentIndexTest = -1;
        this.currentTestName = "";
        this.currentTestCode = "";
        this.editTestMode = false;
      } else if (this.currentTestName === "") {
        this.showToastMissingTestName();
      } else {
        this.showToastMissingTestCode();
      }
    },

    handleOk() {
      if (this.title !== "" && this.statement !== "" && this.folder !== "") {
        this.loadingNewExercise = true;
        let suiteTest = [];
        this.$store
          .dispatch("getFolderIfExist", this.folder)
          .then((folderId) => {
            this.generateResultTests().then((resultSuiteTests) => {
              // Verification that all the result of the suite test have benn successfull
              let errorInResultGeneration = false;

              this.tests.forEach((test, i) => {
                if (resultSuiteTests[i] !== (null || undefined)) {
                  if (
                    Array.isArray(resultSuiteTests[i]) &&
                    resultSuiteTests[i].length == 0
                  ) {
                    suiteTest.push({
                      name: test.name,
                      result: "resultIsAnEmptyArray-VIDE",
                      test: test.test,
                    });
                  } else {
                    suiteTest.push({
                      name: test.name,
                      result: resultSuiteTests[i],
                      test: test.test,
                    });
                  }
                } else {
                  errorInResultGeneration = true;
                }
              });

              if (!errorInResultGeneration) {
                const exercises = {
                  name: this.title,
                  statement: this.statement,
                  initialCode: this.initialCode,
                  solution: this.solutionCode,
                  clue: [
                    ...this.getClue(this.clue1, this.clueCode1),
                    ...this.getClue(this.clue2, this.clueCode2),
                  ],
                  clue1: this.clue1,
                  clueCode1: this.clueCode1,
                  clue2: this.clue2,
                  clueCode2: this.clueCode2,
                  suiteTest: suiteTest,
                };
                const firebaseUtils = this.$store.getters.getFirabaseUtils;
                if (folderId != null) {
                  firebaseUtils.addExercise(folderId, exercises);
                } else {
                  const newFolderId = firebaseUtils.addFolder({
                    name: this.folder,
                  });
                  firebaseUtils.addExercise(newFolderId, exercises);
                }
                this.loadingNewExercise = false;
                this.$bvModal.hide("modal-new-exercise");
                this.showToastSuccessNewExercise();
              } else {
                this.showToastErrorGeneratingResultsTests(
                  "Error Generación Suite Test ❌",
                  "Recomendación: Verifica tu solución y/o variables iniciales"
                );
                this.loadingNewExercise = false;
              }
            });
          });
      } else {
        if (this.title == "")
          this.showToastErrorGeneratingResultsTests(
            "Título ❌",
            "Por favor indique un 'Título'."
          );
        if (this.folder == "")
          this.showToastErrorGeneratingResultsTests(
            "Carpeta ❌",
            "Por favor indique una 'Carpeta', mediante el botón 🔍 puede buscar las existentes."
          );
        if (this.statement == "")
          this.showToastErrorGeneratingResultsTests(
            "Cosigna Ejercicio ❌",
            "Por favor indique una 'Consinga' para el nuevo ejercicio."
          );
      }
    },

    getClue(title, code) {
      if (title || code) {
        const clue = {};
        if (title) {
          clue.title = title;
        }
        if (code) {
          clue.code = code;
        }
        return [clue];
      }
      return [];
    },

    generateResultTests() {
      let promisesResults = [];
      this.tests.forEach((test) => {
        let testContext = {
          state: {
            variablesEditor: this.initialCode + test.test,
            implementationEditor: this.solutionCode,
          },
        };
        promisesResults.push(
          this.$store.dispatch("generateTestResult", testContext)
        );
      });
      return Promise.all(promisesResults);
    },

    showToastSuccessNewExercise() {
      this.$bvToast.toast(`${this.folder} / ${this.title}`, {
        title: "Ejercicio Creado ✔",
        variant: "success",
        solid: true,
        bodyClass: "new-exercise__toast-complete--body",
        headerClass: "new-exercise__toast-complete--header",
      });
    },

    showToastErrorGeneratingResultsTests(title, bodyMessage, delayHide = 5000) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: "danger",
        solid: true,
        bodyClass: "new-exercise__toast-error--body",
        headerClass: "new-exercise__toast-error--header",
        autoHideDelay: delayHide,
      });
    },

    showToastMissingTestName() {
      this.$bvToast.toast(
        "Para agregar/modificar el test es necesario indicar un nombre identificatorio.",
        {
          title: "Nombre identificatio faltante.",
          variant: "danger",
          solid: true,
          bodyClass: "new-exercise__toast-error--body",
          headerClass: "new-exercise__toast-error--header",
          autoHideDelay: 5000,
        }
      );
    },
    showToastMissingTestCode() {
      this.$bvToast.toast("El código del test no puede estar vacio.", {
        title: "Código test faltante.",
        variant: "danger",
        solid: true,
        bodyClass: "new-exercise__toast-error--body",
        headerClass: "new-exercise__toast-error--header",
        autoHideDelay: 5000,
      });
    },
  },

  mounted() {
    this.$root.$on("bv::modal::show", () => {
      this.resetModal();
    });

    this.$root.$on("bv::modal::shown", () => {
      this.$refs.testCodeEditor?.editor?.setShowPrintMargin(false);
      this.$refs.solutionCodeEditor?.editor?.setShowPrintMargin(false);
      this.$refs.initialCodeEditor?.editor?.setShowPrintMargin(false);
    });
  },
};
