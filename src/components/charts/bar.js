import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ["January", "February"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20],
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
