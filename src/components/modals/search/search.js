import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { exercicesDataBase } from "../../../mocks/exercices-data-base";

export default {
  components: { Treeselect },
  data: function() {
    return {
      folders: undefined,
      value: null,
      options: null,
    };
  },

  methods: {
    selectExercise(value) {
      console.log("SELECTED", this.value, value);
    },
  },

  mounted() {
    let self = this;
    const firebaseUtils = this.$store.getters.getFirabaseUtils;

    firebaseUtils.getFolders().then(function(data) {
      self.folders = data.val();
    });

    this.options = exercicesDataBase.fullDataBase;
  },
};
