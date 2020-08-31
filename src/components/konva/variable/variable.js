const sizeRect = 50;

export default {
  props: ["name", "value", "elementIndex"],
  data: function() {
    return {
      elementStartX: 0,
      configVariableGroup: { draggable: true },
    };
  },

  computed: {
    configVariableName: function() {
      return {
        x: this.elementStartX,
        y: 70,
        text: this.name,
        width: sizeRect,
        height: sizeRect,
        align: "center",
        verticalAlig: "middle",
        fill: "white",
      };
    },
    configVariableValue: function() {
      return {
        x: this.elementStartX,
        y: 100,
        text: this.value,
        width: sizeRect,
        height: sizeRect,
        align: "center",
        verticalAlign: "middle",
        fill: "white",
      };
    },
    configVariableRect: function() {
      return {
        x: this.elementStartX,
        y: 100,
        width: sizeRect,
        height: sizeRect,
        fill: "#3b6978",
      };
    },
  },

  mounted() {
    this.elementStartX = this.elementIndex() * 100;
  },
};
