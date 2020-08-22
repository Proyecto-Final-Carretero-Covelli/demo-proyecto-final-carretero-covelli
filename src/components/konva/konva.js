const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data: function() {
    return {
      configKonva: {
        width: width,
        height: height,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      },
    };
  },
  methods: {
    changeRect: function() {
      const container = this.$refs.container;

      if (!container) {
        return;
      }

      const height = container.offsetHeight;
      const width = container.offsetWidth;

      console.log(height, height);
      this.stageSize.width = width;
      this.stageSize.height = height;
    },
  },

  created: function() {
    window.addEventListener("resize", this.changeRect);
    this.changeRect();
  },
};
