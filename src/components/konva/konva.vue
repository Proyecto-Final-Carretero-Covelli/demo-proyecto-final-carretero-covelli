<template>
  <div class="konva" ref="container">
    <v-stage ref="stage" :config="configKonva">
      <v-layer>
        <template v-for="(variable,i) in getDeclaredVariables">
          <variable
            :key="'variable-key-'+i"
            :name="variable.name"
            :value="variable.value"
            :elementIndex="i"
          >{{variable}}</variable>
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script src="./konva.js"></script>
<style src="./konva.scss" lang="scss"></style>
