import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: false,
      maintainAspectRatio: true,
      //   scales: {
      //     yAxes: [
      //       {
      //         ticks: {
      //           min: 0,
      //           beginAtZero: true,
      //         },
      //       },
      //     ],
      //   },
    },
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
