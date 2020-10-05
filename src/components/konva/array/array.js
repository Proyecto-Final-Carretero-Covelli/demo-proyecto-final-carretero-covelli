export default {
  props: ["name", "arrayItems", "elementIndex"],
  data: function() {
    return {
      elementStartX: 0,
      configArrayGroup: { draggable: true },
      configArrayRect: {},
      configArrayValue: {},
      sizeRect: 50,
    };
  },

  computed: {
    configArrayName: function() {
      return {
        x: this.elementStartX,
        y: 70,
        text: this.name,
        width: this.sizeRect,
        height: this.sizeRect,
        align: "center",
        verticalAlig: "middle",
        fill: "white",
      };
    },
  },

  mounted() {
    this.elementStartX = this.elementIndex * 100;
  },
};
