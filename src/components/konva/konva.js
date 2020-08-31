import { mapGetters } from "vuex";
import Variable from "./variable/variable.vue";
import Array from "./array/array.vue";

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  components: { Variable, Array },

  data: function() {
    return {
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      itemCount: 0,
      configKonva: {
        width: width,
        height: height,
        draggable: true,
        onWheel: this.handleWheel,
        scaleX: 0,
        scaleY: 0,
        x: 0,
        y: 0,
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
      this.configKonva.width = width;
      this.configKonva.height = height;
    },
    handleWheel: function(event) {
      event.evt.preventDefault();
      const scaleBy = 1.1;
      const stage = event.target.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
      this.stageScale = newScale;
      this.stageX =
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale;
      this.stageY =
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale;
      this.configKonva.scaleX = this.stageScale;
      this.configKonva.scaleY = this.stageScale;
      this.configKonva.x = this.stageX;
      this.configKonva.y = this.stageY;
    },
    getItemCount: function() {
      this.itemCount = this.itemCount + 1;
      return this.itemCount;
    },
  },

  computed: {
    ...mapGetters(["getDeclaredVariables", "getDeclaredArrays"]),
  },

  created: function() {
    window.addEventListener("resize", this.changeRect);
    this.changeRect();
  },

  mounted() {
    this.configKonva.scaleX = this.stageScale;
    this.configKonva.scaleY = this.stageScale;
    this.configKonva.x = this.stageX;
    this.configKonva.y = this.stageY;
  },
};
