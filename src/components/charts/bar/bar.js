import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
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
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#f5f5f5",
              min: 0,
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#f5f5f5",
            },
          },
        ],
      },
    },
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
