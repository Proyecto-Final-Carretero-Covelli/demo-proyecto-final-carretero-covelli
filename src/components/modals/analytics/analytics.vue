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
      <div class="analytics__suite-test">
        <div class="analytics__suite-test__item">
          <p>
            Total
          </p>
          {{
            (currentExerciseStadistics.passed || 0) +
              (currentExerciseStadistics.notPassed || 0)
          }}
        </div>
        <div
          class="analytics__suite-test__item analytics__suite-test__item--green"
        >
          <p>
            Satisfactorios
          </p>
          {{ currentExerciseStadistics.passed || 0 }}
        </div>
        <div
          class="analytics__suite-test__item analytics__suite-test__item--red"
        >
          <p>
            Rechazados
          </p>
          {{ currentExerciseStadistics.notPassed || 0 }}
        </div>
      </div>
      <Doughnut :chart-data="chartCurrentExerciseStadistics" />

      <div class="analytics__suite-test">
        <div class="analytics__suite-test__item">
          <p>
            Total
          </p>
          {{
            (currentExerciseStadistics.ReferenceError || 0) +
              (currentExerciseStadistics.SyntaxError || 0) +
              (currentExerciseStadistics.TypeError || 0)
          }}
        </div>
        <div class="analytics__suite-test__item">
          <p>
            Variable no declarada o inaccesible (ReferenceError)
          </p>
          {{ currentExerciseStadistics.ReferenceError || 0 }}
        </div>
        <div class="analytics__suite-test__item">
          <p>
            Error de Sintaxis
          </p>
          {{ currentExerciseStadistics.SyntaxError || 0 }}
        </div>
        <div class="analytics__suite-test__item">
          <p>
            No se pudo realizar la operación (TypeError)
          </p>
          {{ currentExerciseStadistics.TypeError || 0 }}
        </div>
      </div>
      <BarChart :chart-data="chartCurrentExerciseErrorStadistics" />
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
