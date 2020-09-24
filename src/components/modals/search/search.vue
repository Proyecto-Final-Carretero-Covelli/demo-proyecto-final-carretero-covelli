<template>
  <b-modal content-class="search" id="modal-search" size="xl" scrollable>
    <template v-slot:modal-title>Buscar Ejercicios</template>
    <!-- <div>{{ folders }}</div> -->
    <div class="m-3">
      <treeselect
        v-model="value"
        :multiple="false"
        :always-open="true"
        :options="options"
        noResultsText="No se encontraron resultados."
        ><label
          slot="option-label"
          slot-scope="{ node, labelClassName }"
          :class="labelClassName"
          @click="selectExercise(JSON.parse(JSON.stringify(node.raw)))"
        >
          {{ node.label }}
        </label></treeselect
      >
    </div>
  </b-modal>
</template>

<script src="./search.js"></script>
<style src="./search.scss" lang="scss"></style>
