<template>
  <b-modal
    id="modal-analytics"
    size="xl"
    content-class="analytics"
    body-class="analytics"
    hide-footer
    scrollable
    centered
  >
    <template v-slot:modal-title>Estadisticas</template>

    <div class="analytics__body" v-if="currentExerciseStadistics">
      <div class="analytics__resume">
        <div class="analytics__resume__item">
          <p>
            Total
          </p>
          {{
            currentExerciseStadistics.passed ||
              0 + currentExerciseStadistics.notPassed ||
              0
          }}
        </div>
        <div class="analytics__resume__item analytics__resume__item--green">
          <p>
            Satisfactorios
          </p>
          {{ currentExerciseStadistics.passed || 0 }}
        </div>
        <div class="analytics__resume__item analytics__resume__item--red">
          <p>
            Rechazados
          </p>
          {{ currentExerciseStadistics.notPassed || 0 }}
        </div>
      </div>
      <BarChart :chart-data="chartCurrentExerciseStadistics" />
    </div>
    <div class="analytics__without-data" v-if="!currentExerciseStadistics">
      <p>
        Lo sentimos no hay estadisticas disponibles.
      </p>
    </div>
  </b-modal>
</template>

<script src="./analytics.js"></script>
<style src="./analytics.scss" lang="scss"></style>
