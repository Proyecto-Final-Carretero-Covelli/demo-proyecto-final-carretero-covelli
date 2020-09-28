<template >
  <b-modal
    content-class="new-exercise"
    id="modal-new-exercise"
    size="xl"
    scrollable
    @ok="handleOk"
  >
    <template v-slot:modal-title>Crear Nuevo Ejercicio</template>
    <div>
      <b-form-input
        id="new-exercise-folder"
        :state="null"
        placeholder="Carpeta"
        v-model="folder"
        class="mb-4"
      ></b-form-input>
      <treeselect
        v-model="folder"
        :multiple="false"
        :options="options"
        noResultsText="No se encontraron resultados."
      >
      </treeselect>
    </div>
    <div class="mt-3">
      <b-form-input
        id="new-exercise-title"
        :state="null"
        placeholder="Título"
        v-model="title"
      ></b-form-input>
      <b-form-textarea
        class="mt-3"
        id="new-exercise-statement"
        size="lg"
        placeholder="Consigna Ejercicio"
        v-model="statement"
      ></b-form-textarea>
    </div>

    <div class="mt-3">
      <p>Código Inicial</p>
      <div class="new-exercise__code-editor">
        <aceeditor
          v-model="initialCode"
          @init="editorInit"
          lang="typescript"
          theme="dracula"
          ref="initialCodeEditor"
        ></aceeditor>
      </div>
    </div>
    <div class="mt-3">
      <p>Código Solución</p>
      <div class="new-exercise__code-editor">
        <aceeditor
          v-model="solutionCode"
          @init="editorInit"
          lang="typescript"
          theme="dracula"
          ref="solutionCodeEditor"
        ></aceeditor>
      </div>
    </div>

    <div class="mt-3">
      <div>
        <p>Suite de Test</p>
      </div>
      <div class="d-flex">
        <div class="w-50 pr-2">
          <template v-if="tests.length > 0">
            <div
              v-for="(test, i) in tests"
              :key="'test-' + i"
              class="d-flex mb-1 new-exercise__test--item"
              @click="showTest(i)"
            >
              <div class="d-flex">
                <div class="mr-3">{{ i + 1 }}.</div>
                <div>{{ test.name }}</div>
              </div>

              <font-awesome-icon
                class="new-exercise__test--item--delete"
                :icon="['fas', 'trash-alt']"
                @click="deleteTest(i)"
              />
            </div>
          </template>
          <div
            v-else
            class="w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <div class="d-flex justify-content-center align-items-center">
              <font-awesome-icon
                class="mr-2"
                :icon="['fas', 'info-circle']"
                size="lg"
              />
              <p class="m-0">Sin Tests</p>
            </div>
          </div>
        </div>
        <div class="w-50 pl-2 d-flex new-exercise__test--adder-container">
          <b-form-input
            id="new-exercise-test-title"
            v-model="currentTestName"
            :state="null"
            placeholder="Nombre Test"
          ></b-form-input>

          <div class="mt-2 mb-2 new-exercise__code-editor">
            <aceeditor
              v-model="currentTestCode"
              @init="editorInit"
              lang="typescript"
              theme="dracula"
              ref="testCodeEditor"
            ></aceeditor>
          </div>
          <template v-if="!editTestMode">
            <b-button
              @click="addTest"
              variant="success"
              class="new-exercise__test--adder-button"
              >Agregar Test</b-button
            >
          </template>
          <template v-if="editTestMode">
            <div class="d-flex justify-content-end">
              <b-button
                @click="cancelEdit"
                variant="secondary"
                class="new-exercise__test--adder-button mr-2"
                >Cancelar</b-button
              >
              <b-button
                @click="saveEdit"
                variant="primary"
                class="new-exercise__test--adder-button"
                >Guardar</b-button
              >
            </div>
          </template>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script src="./new-exercise.js"></script>
<style src="./new-exercise.scss" lang="scss"></style>
