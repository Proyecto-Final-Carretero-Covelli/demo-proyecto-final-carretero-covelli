<template>
  <div class="konva" ref="container">
    <v-stage ref="stage" :config="configKonva">
      <v-layer>
        <v-circle :config="configCircle"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<script src="./konva.js"></script>
<style src="./konva.scss" lang="scss"></style>
