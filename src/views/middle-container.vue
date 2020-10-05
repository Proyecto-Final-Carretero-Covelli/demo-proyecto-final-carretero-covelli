<template>
  <div class="middle-container">
    <template>
      <split-pane
        ref="resizeTitle"
        :min-percent="0"
        :default-percent="$store.getters.getTitle === null ? 0 : 20"
        split="horizontal"
        :class="
          $store.getters.getTitle === null
            ? 'main-split-pane-hide'
            : 'main-split-pane-show'
        "
      >
        <template v-if="$store.getters.getTitle !== null" slot="paneL">
          <div class="middle-container__title-background">
            {{ $store.getters.getTitleText }}
          </div>
        </template>
        <template slot="paneR">
          <div class="middle-container__lower">
            <split-pane
              :min-percent="10"
              :default-percent="50"
              split="vertical"
            >
              <template slot="paneL">
                <split-pane
                  :min-percent="10"
                  :default-percent="50"
                  split="horizontal"
                >
                  <template slot="paneL">
                    <aceeditor
                      v-model="variablesEditor"
                      @init="editorInit"
                      lang="typescript"
                      theme="dracula"
                      ref="myVariablesEditor"
                    ></aceeditor>
                  </template>

                  <template slot="paneR">
                    <aceeditor
                      v-model="implementationEditor"
                      @init="editorInit"
                      lang="typescript"
                      theme="dracula"
                      ref="myImplementationEditor"
                    ></aceeditor>
                  </template>
                </split-pane>
              </template>

              <template slot="paneR">
                <div style="max-height: 100%; height: 100%">
                  <b-tabs content-class="mt-3 h-100">
                    <b-tab title="Visualización de estructuras" active>
                      <konva></konva>
                    </b-tab>

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
                          v-for="test in $store.getters.getCurrentExercise
                            .suiteTest"
                          :key="test.name"
                          class="card test-card"
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

                      <div
                        class="mt-3 test-play-all"
                        @click="onRunAllTestsClicked()"
                      >
                        Ejecutar Todos
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </template>
            </split-pane>
          </div>
        </template>
      </split-pane>
    </template>
  </div>
</template>

<script src="./middle-container.js"></script>
<style src="./middle-container.scss" lang="scss"></style>
