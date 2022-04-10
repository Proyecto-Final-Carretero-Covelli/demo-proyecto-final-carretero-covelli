<template>
  <b-tab
    :disabled="!$store.getters.getCurrentExercise.suiteTest"
    class="suite-test container"
    title="Suite de test"
  >
    <div
      class="w-100 pl-0 pr-2"
      style="height: calc(100% - 112px); overflow-y: scroll"
    >
      <div
        v-for="test in $store.getters.getCurrentExercise.suiteTest"
        :key="test.name"
        class="suite-test__card"
      >
        <div>
          <div :id="test.name">
            <font-awesome-icon
              v-if="test.imgInfo.state == 'passed'"
              :icon="['fas', 'check']"
              size="lg"
              class="suite-test__card__state--passed"
            />
            <font-awesome-icon
              v-if="test.imgInfo.state == 'not-passed'"
              :icon="['fas', 'ban']"
              size="lg"
              class="suite-test__card__state--not-passed"
            />
            <font-awesome-icon
              v-if="test.imgInfo.state == 'not-executed'"
              :icon="['far', 'square']"
              size="lg"
              class="suite-test__card__state--not-executed"
            />
          </div>
          <b-tooltip :target="test.name">
            {{ test.imgInfo.tooltip }}
          </b-tooltip>
        </div>

        <div class="suite-test__card__name">
          <p @click="selectTest(test)">{{ test.name }}</p>
        </div>

        <div>
          <font-awesome-icon
            class="suite-test__card__play"
            :icon="['fas', 'play']"
            @click="onPlayTestClicked(test, $event)"
          />
        </div>
      </div>
    </div>

    <div class="suite-test__play-all" @click="onRunAllTestsClicked()">
      Ejecutar Todos
    </div>
  </b-tab>
</template>

<script src="./suite-test.js"></script>
<style src="./suite-test.scss" lang="scss"></style>
