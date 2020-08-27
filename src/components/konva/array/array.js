const sizeRect = 50;

export default {
  props: ["name", "arrayItems", "elementIndex"],
  data: function() {
    return {
      elementStartX: 0,
      configArrayGroup: { draggable: true },
      configArrayName: {},
      configArrayRect: {},
      configArrayValue: {},
    };
  },

  mounted() {
    this.elementStartX = this.elementIndex() * 100;
    this.configArrayName = {
      x: this.elementStartX,
      y: 50,
      text: this.name,
      width: sizeRect,
      height: sizeRect,
      align: "center",
      verticalAlig: "middle",
      fill: "white",
    };
    this.configArrayRect = {
      x: this.elementStartX,
      y: 100,
      width: sizeRect,
      height: sizeRect,
      fill: "#3b6978",
    };
    this.configArrayValue = {
      x: this.elementStartX,
      y: 100,
      text: this.arrayItems,
      width: sizeRect,
      height: sizeRect,
      align: "center",
      verticalAlign: "middle",
      fill: "white",
    };
  },
};
