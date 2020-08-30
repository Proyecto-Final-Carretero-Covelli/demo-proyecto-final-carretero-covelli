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
    },

    resizeHandler(event) {
      console.log("Event", event);
    },
  },

  computed: {
    editorContent: {
      get() {
        return this.$store.getters.getEditorContent;
      },
      set(newValue) {
        this.$store.commit("setEditorContent", newValue);
      },
    },
    resize: {
      get() {
        return this.$store.getters.getResize;
      },
      set(newValue) {
        console.log("Resize", newValue);
        this.$store.commit("setResize", newValue);
      },
    },
  },

  mounted() {
    let editor = this.$refs.myEditor.editor;
    editor.setShowPrintMargin(false);
    console.log(editor);
  },
};
