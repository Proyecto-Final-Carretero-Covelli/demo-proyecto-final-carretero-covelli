export default {
  props: ["name", "arrayItems", "elementIndex"],
  data: function() {
    return {
      elementStartX: 0,
      configArrayGroup: { draggable: true },
      configArrayName: {},
      configArrayRect: {},
      configArrayValue: {},
      sizeRect: 50,
    };
  },

  mounted() {
    this.elementStartX = this.elementIndex() * 100;
    this.configArrayName = {
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
};
