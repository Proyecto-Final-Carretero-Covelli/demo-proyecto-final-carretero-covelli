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

    <div class="analytics__body" v-if="currentExerciseStatistics">
      <h4>
        Estadisticas Suite de Test
      </h4>
      <div class="analytics__suite-test">
        <div>
          <div
            class="analytics__suite-test__item analytics__suite-test__item--green"
          >
            <p>
              Satisfactorios:
            </p>
            {{ currentExerciseStatistics.passed || 0 }}
          </div>
          <div
            class="analytics__suite-test__item analytics__suite-test__item--red"
          >
            <p>
              Rechazados:
            </p>
            {{ currentExerciseStatistics.notPassed || 0 }}
          </div>
          <div class="analytics__suite-test__item">
            <p>
              Total:
            </p>
            {{
              (currentExerciseStatistics.passed || 0) +
                (currentExerciseStatistics.notPassed || 0)
            }}
          </div>
        </div>
        <Doughnut :chart-data="chartCurrentExerciseStatistics" />
      </div>

      <h4>
        Estadisticas Errores en Ejecuciones
      </h4>
      <div class="analytics__suite-test">
        <div style="max-width: 30%">
          <div
            class="analytics__suite-test__item analytics__suite-test__item--purple"
          >
            <p>
              Error de referencia:
            </p>
            {{ currentExerciseStatistics.ReferenceError || 0 }}
          </div>
          <div
            class="analytics__suite-test__item analytics__suite-test__item--pink"
          >
            <p>
              Error de Sintaxis:
            </p>
            {{ currentExerciseStatistics.SyntaxError || 0 }}
          </div>
          <div
            class="analytics__suite-test__item analytics__suite-test__item--violet"
          >
            <p>
              Operación invalida:
            </p>
            {{ currentExerciseStatistics.TypeError || 0 }}
          </div>
          <div class="analytics__suite-test__item">
            <p>
              Total:
            </p>
            {{
              (currentExerciseStatistics.ReferenceError || 0) +
                (currentExerciseStatistics.SyntaxError || 0) +
                (currentExerciseStatistics.TypeError || 0)
            }}
          </div>
        </div>

        <BarChart :chart-data="chartCurrentExerciseErrorStatistics" />
      </div>
    </div>
    <div class="analytics__without-data" v-if="!currentExerciseStatistics">
      <p>
        Lo sentimos no hay estadisticas disponibles.
      </p>
    </div>
  </b-modal>
</template>

<script src="./analytics.js"></script>
<style src="./analytics.scss" lang="scss"></style>
