<template>
  <div class="middle-container">
    <split-pane :min-percent="10" :default-percent="50" split="vertical">
      <template slot="paneL">
        <aceeditor
          v-model="editorContent"
          @init="editorInit"
          lang="typescript"
          theme="dracula"
          ref="myEditor"
        ></aceeditor>
        ></template
      >
      <template slot="paneR">
        {{ $store.getters.getCount }}
      </template>
    </split-pane>
  </div>
</template>

<script src="./middle-container.js"></script>
<style src="./middle-container.scss" lang="scss"></style>
