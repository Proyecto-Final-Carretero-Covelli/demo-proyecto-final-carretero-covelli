<template>
  <b-modal
    content-class="new-exercise"
    id="modal-new-exercise"
    size="xl"
    scrollable
  >
    <template v-slot:modal-title>Crear Nuevo Ejercicio</template>

    <div class="d-flex align-items-center w-100">
      <div class="new-exercise__folder input-deco">
        <div class="d-flex align-items-center">
          <b-form-input
            id="new-exercise-folder"
            :state="null"
            placeholder="Carpeta"
            v-model="folder"
            @keyup.enter="openSearchDropdown"
            @keyup.esc="closeSearchDropdown"
          ></b-form-input>

          <font-awesome-icon
            v-if="!searchActive"
            class="new-exercise__folder--icon"
            :icon="['fas', 'search']"
            @click="searchFolder"
          />
          <font-awesome-icon
            v-if="searchActive"
            class="new-exercise__folder--icon"
            :icon="['fas', 'times']"
            @click="searchFolder"
          />
        </div>
        <ul v-if="searchActive" class="new-exercise__folder--search-container">
          <li
            v-for="(folder, i) in filterFolders"
            :key="'filterFolders' + i"
            class="new-exercise__folder--search-result"
            @click="selectFolder(folder.label)"
          >
            {{ folder.label }}
          </li>
        </ul>
      </div>

      <div
        class="ml-2 mr-2 d-flex justify-content-center align-items-center"
        style="width: 2%"
      >
        <p class="m-0" style="font-size: 30px">\</p>
      </div>

      <div class="new-exercise__title input-deco">
        <b-form-input
          id="new-exercise-title"
          :state="null"
          placeholder="Título"
          v-model="title"
        ></b-form-input>
      </div>
    </div>

    <div class="mt-3 input-deco input-deco--border">
      <b-form-textarea
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
          lang="javascript"
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
          lang="javascript"
          theme="dracula"
          ref="solutionCodeEditor"
        ></aceeditor>
      </div>
    </div>
    <div class="mt-3">
      <p>Pistas</p>
      <div class="new-exercise__split-50">
        <div class="mr-3 input-deco input-deco--border">
          <b-form-textarea
            id="new-exercise-statement"
            size="lg"
            placeholder="Pista 1"
            v-model="clue1"
          ></b-form-textarea>
        </div>
        <div class="new-exercise__code-editor">
          <aceeditor
            v-model="clueCode1"
            @init="editorInit"
            lang="javascript"
            theme="dracula"
          ></aceeditor>
        </div>
      </div>
      <div class="mt-3 new-exercise__split-50">
        <div class="mr-3 input-deco input-deco--border">
          <b-form-textarea
            id="new-exercise-statement"
            size="lg"
            placeholder="Pista 2"
            v-model="clue2"
          ></b-form-textarea>
        </div>
        <div class="new-exercise__code-editor">
          <aceeditor
            v-model="clueCode2"
            @init="editorInit"
            lang="javascript"
            theme="dracula"
          ></aceeditor>
        </div>
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
              lang="javascript"
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

    <template v-slot:modal-footer="{ cancel }">
      <div class="w-100 d-flex justify-content-end align-items-center">
        <template v-if="!loadingNewExercise">
          <b-button size="md" class="mr-2 " @click="cancel()">
            Cancelar
          </b-button>
          <b-button variant="primary" size="md" @click="handleOk()">
            Aceptar
          </b-button>
        </template>

        <template v-if="loadingNewExercise">
          <div>
            <b-spinner
              small
              type="grow"
              label="Loading..."
              class="top-header__controll-icon"
            ></b-spinner>
          </div>
        </template>
      </div>
    </template>
  </b-modal>
</template>

<script src="./new-exercise.js"></script>
<style src="./new-exercise.scss" lang="scss"></style>
