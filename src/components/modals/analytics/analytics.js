import BarChart from "../../charts/bar/bar";
import Doughnut from "../../charts/doughtnut/doughtnut";

export default {
  components: { BarChart, Doughnut },
  data() {
    return {};
  },
  computed: {
    currentExerciseStatistics() {
      return this.$store.getters.getCurrentExerciseStatistics;
    },
    chartCurrentExerciseStatistics() {
      return {
        labels: ["Satisfactorios", "Rechazados"],
        datasets: [
          {
            label: ["Satisfactorios", "Rechazados"],
            backgroundColor: ["#006d45", "#db4b16"],
            data: [
              this.currentExerciseStatistics?.passed,
              this.currentExerciseStatistics?.notPassed,
            ],
          },
        ],
      };
    },
    chartCurrentExerciseErrorStatistics() {
      return {
        labels: ["Número de Errores en Ejecuciones"],
        datasets: [
          {
            label: "Errores de referencia",
            backgroundColor: "#9C27B0",
            data: [this.currentExerciseStatistics?.ReferenceError],
          },
          {
            label: "Error de Sintaxis",
            backgroundColor: "#C2185B",
            data: [this.currentExerciseStatistics?.SyntaxError],
          },
          {
            label: "Operación invalida",
            backgroundColor: "#5E35B1",
            data: [this.currentExerciseStatistics?.TypeError],
          },
        ],
      };
    },
  },
  methods: {},
  mounted() {},
};
