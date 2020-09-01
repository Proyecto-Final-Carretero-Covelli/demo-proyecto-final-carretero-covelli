<template>
  <div class="middle-container">
    <template>
      <split-pane ref="resizeTitle" :min-percent="0" :default-percent="20" split="horizontal">
        <template slot="paneL">
          <div class="middle-container__title-background">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
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
