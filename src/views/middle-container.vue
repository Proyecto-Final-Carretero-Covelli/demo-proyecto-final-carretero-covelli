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
        <!-- Statement Exercise -->
        <template v-if="$store.getters.getTitle !== null" slot="paneL">
          <div class="middle-container__title-background">
            {{ $store.getters.getTitleText }}
          </div>
        </template>

        <!-- Lower Middle Container - [(Code editors) + (Structures View + Suite Test + Console)] -->
        <template slot="paneR">
          <div class="middle-container__lower">
            <split-pane
              :min-percent="10"
              :default-percent="50"
              split="vertical"
            >
              <!-- Code Editors -->
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
                      lang="javascript"
                      theme="dracula"
                      ref="myVariablesEditor"
                    ></aceeditor>
                  </template>

                  <template slot="paneR">
                    <aceeditor
                      v-model="implementationEditor"
                      @init="editorInit"
                      lang="javascript"
                      theme="dracula"
                      ref="myImplementationEditor"
                    ></aceeditor>
                  </template>
                </split-pane>
              </template>

              <!-- Structures View + Suite Test + Console -->
              <template slot="paneR">
                <split-pane
                  :min-percent="20"
                  :default-percent="65"
                  split="horizontal"
                >
                  <template slot="paneL" style="overflow: hidden">
                    <div style="max-height: 100%; height: 100%">
                      <b-tabs content-class="mt-1 h-100">
                        <!-- Structures View  -->
                        <b-tab title="Visualización de estructuras" active>
                          <konva></konva>
                        </b-tab>

                        <!-- Suite Test -->
                        <suite-test></suite-test>
                      </b-tabs>
                    </div>
                  </template>
                  <!-- Console -->
                  <template slot="paneR"> <console></console></template>
                </split-pane>
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
