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
                <div>
                  <b-tabs content-class="mt-3">

                    <b-tab title="Visualización de estructuras" active>
                      <konva></konva>
                    </b-tab>

                    <b-tab :disabled="!$store.getters.getCurrentExercise.suiteTest" class="container scrollable" title="Suite de test">

                      <button class="btn btn-primary btn-sm play-all" @click="onRunAllTestsClicked()">
                        Ejecutar todo
                      </button>

                      <div v-for="test in $store.getters.getCurrentExercise.suiteTest" :key="test.name" class="card test-card" @click="selectTest(test)">

                        <div class="small">
                          <img :id="test.name" class="card-icon" :src="test.imgInfo.img"/>
                          <b-tooltip :target="test.name"> {{test.imgInfo.tooltip}} </b-tooltip>
                        </div>
                        
                        <div class="large text-center">
                          <p> {{ test.name }} </p>
                        </div>
                        
                        <div class="small">
                          <img class="card-play hoverable" src="https://www.flaticon.com/svg/static/icons/svg/151/151860.svg" @click="onPlayTestClicked(test, $event)"/>
                        </div>
                        
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
