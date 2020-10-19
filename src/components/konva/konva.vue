<template>
  <div class="konva" ref="containerKonva">
    <v-stage ref="stage" :config="configKonva">
      <v-layer>
        <template v-for="(variable, i) in getDeclaredVariables">
          <template v-if="Array.isArray(variable.value)">
            <array
              :key="'array-key-' + i"
              :name="variable.name"
              :arrayItems="variable.value"
              :elementIndex="i"
            ></array>
          </template>
          <template v-else>
            <variable
              :key="'variable-key-' + i"
              :name="variable.name"
              :value="variable.value"
              :elementIndex="i"
              >{{ variable }}</variable
            >
          </template>
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script src="./konva.js"></script>
<style src="./konva.scss" lang="scss"></style>
