<template>
  <b-modal id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>Nuevo Ejercicio</template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>
</template>

<script src="./new-exercise.js"></script>
<style src="./new-exercise.scss" lang="scss"></style>
