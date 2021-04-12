export default {
  components: { aceeditor: require("vue2-ace-editor") },
  data() {
    return {
      index: null,
      selectedClueCode: undefined,
    };
  },
  computed: {
    clues() {
      const clues = this.$store.getters.getCurrentExercise.clue
        ? this.$store.getters.getCurrentExercise.clue
        : [];
      return [
        ...clues,
        {
          label: "Código Solución",
          code: this.$store.getters.getCurrentExercise.solution,
        },
      ];
    },
  },
  methods: {
    selectClue(index) {
      this.index = index;
      this.selectedClueCode = this.clues[this.index].code;
    },
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
  beforeDestroy() {
    console.log("destroy");
  },
};
