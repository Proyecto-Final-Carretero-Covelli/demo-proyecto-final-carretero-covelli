export default {
  components: { aceeditor: require("vue2-ace-editor") },

  data: function() {
    return {
      editorContent: "",
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
  },

  mounted() {
    let editor = this.$refs.myEditor.editor;
    editor.setShowPrintMargin(false);
    console.log(editor);
  },
};
