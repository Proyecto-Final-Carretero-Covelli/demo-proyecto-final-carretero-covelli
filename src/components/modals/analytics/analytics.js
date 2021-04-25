import BarChart from "../../charts/bar/bar";
import Doughnut from "../../charts/doughtnut/doughtnut";

export default {
  components: { BarChart, Doughnut },
  data() {
    return {};
  },
  computed: {
    currentExerciseStadistics() {
      return this.$store.getters.getCurrentExerciseStadistics;
    },
    chartCurrentExerciseStadistics() {
      return {
        labels: ["Satisfactorios", "Rechazados"],
        datasets: [
          {
            label: ["Satisfactorios", "Rechazados"],
            backgroundColor: ["#006d45", "#db4b16"],
            data: [
              this.currentExerciseStadistics?.passed,
              this.currentExerciseStadistics?.notPassed,
            ],
          },
        ],
      };
    },
    chartCurrentExerciseErrorStadistics() {
      return {
        labels: ["Número de Errores en Ejecuciones"],
        datasets: [
          {
            label: "Errores de referencia",
            backgroundColor: "#9C27B0",
            data: [this.currentExerciseStadistics?.ReferenceError],
          },
          {
            label: "Error de Sintaxis",
            backgroundColor: "#C2185B",
            data: [this.currentExerciseStadistics?.SyntaxError],
          },
          {
            label: "Operación invalida",
            backgroundColor: "#5E35B1",
            data: [this.currentExerciseStadistics?.TypeError],
          },
        ],
      };
    },
  },
  methods: {},
  mounted() {},
};
