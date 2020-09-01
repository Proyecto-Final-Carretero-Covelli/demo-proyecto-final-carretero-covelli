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
                <aceeditor
                  v-model="editorContent"
                  @init="editorInit"
                  lang="typescript"
                  theme="dracula"
                  ref="myEditor"
                ></aceeditor>
              </template>
              <template slot="paneR">
                <konva></konva>
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
