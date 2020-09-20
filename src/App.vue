<template>
  <div id="app">
    <!-- <MainScene /> -->
    <main-container />
    <v-dialog />
  </div>
</template>

<script>
// import MainScene from "./components/MainScene.vue";
import MainContainer from "./views/main-container.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "App",
  components: {
    // MainScene
    MainContainer,
  },
};
</script>

<style></style>
