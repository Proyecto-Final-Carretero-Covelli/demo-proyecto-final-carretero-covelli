import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

//import { exercicesDataBase } from "../../../mocks/exercices-data-base";

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

    parseFolders(folders) {
      let result = [];
      for (const idFolder in folders) {
        let folder = folders[idFolder];
        let newFolder = {
          id: idFolder,
          label: folder["name"],
          children: [],
        };
        for (const idExercise in folder["exercises"]) {
          let exercise = folder["exercises"][idExercise];
          newFolder["children"].push({
            id: exercise["id"],
            label: exercise["name"],
            exercise: exercise,
          });
        }
        result.push(newFolder);
      }
      return result;
    },
  },

  mounted() {
    let self = this;
    const firebaseUtils = this.$store.getters.getFirabaseUtils;

    firebaseUtils.getFolders().then(function(data) {
      self.folders = data.val();
      console.log(data.val());
      self.options = self.parseFolders(data.val());
    });
  },
};
