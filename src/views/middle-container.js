import Konva from "../components/konva/konva.vue";

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

      let self = this;
      const exercisesRef = this.$store.getters.getDb.ref("exercises");

      exercisesRef.once("value").then(function(snapshot) {
        const exercises = snapshot.val();
        const sumExercise = exercises[Object.keys(exercises)[0]].javascript;
        
        self.implementationEditor = sumExercise;
      });
    },
  },

  computed: {
    implementationEditor: {
      get() {
        return this.$store.getters.getImplementationEditor;
      },
      set(newValue) {
        this.$store.commit("setImplementationEditor", newValue);
      }
    },

    variablesEditor: {
      get() {
        return this.$store.getters.getVariablesEditor;
      },
      set(newValue) {
        this.$store.commit("setVariablesEditor", newValue);
      }
    }
  },

  mounted() {
    this.$store.commit("setResizeTitle", this.$refs.resizeTitle);

    let editor = this.$refs.myEditor.editor;
    editor.setShowPrintMargin(false);
  },
};
