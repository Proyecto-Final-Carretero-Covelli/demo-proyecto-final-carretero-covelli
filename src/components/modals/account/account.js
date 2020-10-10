export default {
  methods: {
    closeModal() {
      this.$bvModal.hide("modal-account");
    },

    signOut() {
      this.$store.dispatch("signOut");
    },
  },
};
