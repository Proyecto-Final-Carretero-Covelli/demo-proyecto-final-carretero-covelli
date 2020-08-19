<template>
  <div id="app">
    <main-container></main-container>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import MainScene from "./components/MainScene.vue";
import MainContainer from "./views/main-container.vue";

export default {
  name: "App",
  components: {
    MainContainer,
  },
};
</script>

<style></style>
