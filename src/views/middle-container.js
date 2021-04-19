import Konva from "../components/konva/konva.vue";
import Console from "../components/console/console.vue";
import SuiteTest from "../components/suite-test/suite-test.vue";

export default {
  components: {
    aceeditor: require("vue2-ace-editor"),
    Konva,
    Console,
    SuiteTest,
  },

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

    this.$store.commit("setVariablesAceEditor", variablesEditor);
    this.$store.commit("setImplementationAceEditor", implementationEditor);
  },
};
