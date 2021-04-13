<template>
  <div id="app">
    <main-container />
    <v-dialog />
  </div>
</template>

<script>
import MainContainer from "./views/main-container.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "App",
  components: {
    MainContainer,
  },
};
</script>

<style></style>
