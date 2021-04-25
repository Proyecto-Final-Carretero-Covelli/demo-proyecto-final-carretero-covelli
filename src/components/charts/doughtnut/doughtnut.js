import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      legend: {
        labels: {
          fontColor: "#f5f5f5",
          fontSize: 12,
        },
      },
      responsive: false,
      maintainAspectRatio: true,
    },
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
