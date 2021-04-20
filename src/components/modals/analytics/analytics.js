import BarChart from "../../charts/bar";

export default {
  components: { BarChart },
  data() {
    return {};
  },
  computed: {
    currentExerciseStadistics() {
      return this.$store.getters.getCurrentExerciseStadistics;
    },
    chartCurrentExerciseStadistics() {
      return {
        labels: ["Suite Test"],
        datasets: [
          {
            label: "Aprobados",
            backgroundColor: "#009c70",
            data: [this.currentExerciseStadistics?.passed],
          },
          {
            label: "Rechazados",
            backgroundColor: "#db4b16",
            data: [this.currentExerciseStadistics?.notPassed],
          },
        ],
      };
    },
  },
  methods: {},
  mounted() {},
};
