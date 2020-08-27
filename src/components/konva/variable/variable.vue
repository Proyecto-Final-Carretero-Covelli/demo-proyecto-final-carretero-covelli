<template>
  <v-group :config="configVariableGroup">
    <v-text :config="configVariableName"></v-text>
    <v-rect :config="configVariableRect"></v-rect>
    <v-text :config="configVariableValue"></v-text>
  </v-group>
</template>

<script src="./variable.js"></script>
<style src="./variable.scss" lang="scss"></style>