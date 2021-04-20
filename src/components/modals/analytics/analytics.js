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
    chartCurrentExerciseErrorStadistics() {
      return {
        labels: ["Ejecuciones"],
        datasets: [
          {
            label: "Errores de referencia",
            backgroundColor: "#009c70",
            data: [this.currentExerciseStadistics?.ReferenceError],
          },
          {
            label: "Error de Sintaxis",
            backgroundColor: "#db4b16",
            data: [this.currentExerciseStadistics?.SyntaxError],
          },
          {
            label: "Operación invalida",
            backgroundColor: "#db4b16",
            data: [this.currentExerciseStadistics?.TypeError],
          },
        ],
      };
    },
  },
  methods: {},
  mounted() {},
};
