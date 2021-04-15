<template>
  <b-modal
    id="modal-analytics"
    size="xl"
    content-class="analytics"
    body-class="analytics"
    @hidden="hiddenEvent"
    hide-footer
    scrollable
    centered
  >
    <template v-slot:modal-title>Estadisticas</template>

    <div>
      <BarChart />
    </div>
  </b-modal>
</template>

<script src="./analytics.js"></script>
<style src="./analytics.scss" lang="scss"></style>
