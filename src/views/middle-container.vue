<template>
  <div class="middle-container">
    <template>
      <split-pane ref="resizeTitle" :min-percent="0" :default-percent="20" split="horizontal">
        <template slot="paneL">
          <div class="middle-container__title-background">{{$store.getters.getTitleText}}</div>
        </template>
        <template slot="paneR">
          <div class="middle-container__lower">
            <split-pane :min-percent="10" :default-percent="50" split="vertical">
              <template slot="paneL">
                <split-pane :min-percent="10" :default-percent="50" split="horizontal">
                  <template slot="paneL">
                    <aceeditor
                      v-model="variablesEditor"
                      @init="editorInit"
                      lang="typescript"
                      theme="dracula"
                      ref="myEditor"
                    ></aceeditor>
                  </template>

                  <template slot="paneR">
                    <aceeditor
                      v-model="implementationEditor"
                      @init="editorInit"
                      lang="typescript"
                      theme="dracula"
                      ref="myEditor"
                    ></aceeditor>
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <split-pane :min-percent="10" :default-percent="50" split="horizontal">
                  <template slot="paneL">
                    <konva></konva>
                  </template>

                  <template slot="paneR">
                    <button @click="$store.dispatch('addTest', 'Test 1')">Test 1</button>
                    <button @click="$store.dispatch('addTest', 'Test 2')">Test 2</button>
                    <button @click="$store.dispatch('addTest', 'Test 3')">Test 3</button>
                  </template>
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
