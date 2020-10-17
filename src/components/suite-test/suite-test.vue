<template>
  <b-tab
    :disabled="!$store.getters.getCurrentExercise.suiteTest"
    class="container test-container"
    title="Suite de test"
  >
    <div
      class="w-100 pl-0 pr-2"
      style="height: calc(100% - 112px); overflow-y: scroll"
    >
      <div
        v-for="test in $store.getters.getCurrentExercise.suiteTest"
        :key="test.name"
        class="test-card"
      >
        <div>
          <div :id="test.name">
            <font-awesome-icon
              v-if="test.imgInfo.state == 'passed'"
              :icon="['fas', 'check']"
              size="lg"
              class="test-card__state--passed"
            />
            <font-awesome-icon
              v-if="test.imgInfo.state == 'not-passed'"
              :icon="['fas', 'ban']"
              size="lg"
              class="test-card__state--not-passed"
            />
            <font-awesome-icon
              v-if="test.imgInfo.state == 'not-executed'"
              :icon="['far', 'square']"
              size="lg"
              class="test-card__state--not-executed"
            />
          </div>
          <b-tooltip :target="test.name">
            {{ test.imgInfo.tooltip }}
          </b-tooltip>
        </div>

        <div class="test-card__name">
          <p @click="selectTest(test)">{{ test.name }}</p>
        </div>

        <div>
          <font-awesome-icon
            class="card-play"
            :icon="['fas', 'play']"
            @click="onPlayTestClicked(test, $event)"
          />
        </div>
      </div>
    </div>

    <div class="mt-3 test-play-all" @click="onRunAllTestsClicked()">
      Ejecutar Todos
    </div>
  </b-tab>
</template>

<script src="./suite-test.js"></script>
<style src="./suite-test.scss" lang="scss"></style>
