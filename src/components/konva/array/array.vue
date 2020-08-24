<template>
  <v-group :config="configArrayGroup">
    <v-text :config="configArrayName"></v-text>
    <template v-for="(arrayItem,i) in arrayItems">
      <v-rect :config="configArrayRect"></v-rect>
      <!-- Implementar un metodo que retorne el obj de configuración dados los parametros dados -->
      <v-text :config="configArrayValue"></v-text>
    </template>
  </v-group>
</template>

<script src="./array.js"></script>
<style src="./array.scss" lang="scss"></style>