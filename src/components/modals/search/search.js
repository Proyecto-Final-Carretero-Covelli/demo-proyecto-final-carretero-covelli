export default {
  data: function() {
    return {
      folders: undefined,
    };
  },

  mounted() {
    let self = this;
    const firebaseUtils = this.$store.getters.getFirabaseUtils;

    firebaseUtils.getFolders().then(function(data) {
      self.folders = data.val();
    });
  },
};
