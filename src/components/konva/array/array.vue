<template>
  <v-group :config="configArrayGroup">
    <v-text :config="configArrayName"></v-text>
    <template v-for="(arrayItem,i) in arrayItems">
      <v-rect
        :key="'rect-array-item-'+i"
        :config="{
          x: elementStartX,
          y: 100 + sizeRect * i,
          width: sizeRect,
          height: sizeRect,
          fill: '#009c70',
        }"
      ></v-rect>
      <v-text
        :key="'text-array-item-'+i"
        :config="{
          x: elementStartX,
          y: 100 + sizeRect * i,
          text: arrayItem,
          width: sizeRect,
          height: sizeRect,
          align: 'center',
          verticalAlign: 'middle',
          fill: 'white',
       }"
      ></v-text>
    </template>
  </v-group>
</template>

<script src="./array.js"></script>
<style src="./array.scss" lang="scss"></style>