<template>
  <b-modal
    id="modal-clue"
    size="xl"
    content-class="clue"
    body-class="clue__body"
    @hidden="hiddenEvent"
    hide-footer
    scrollable
    centered
  >
    <template v-slot:modal-title>Pistas disponibles</template>

    <div class="clue__keypad">
      <b-button
        v-for="(clue, i) in clues"
        :key="i"
        class="clue__keypad__option"
        :class="{ 'clue__keypad__option--selected': i === index }"
        @click="selectClue(i)"
      >
        {{ clue.label ? clue.label : "Pista " + (i + 1) }}
      </b-button>
    </div>
    <div v-if="index !== null" class="clue__body">
      <div class="clue__body__title" v-if="clues[index].title">
        {{ clues[index].title }}
      </div>
      <div class="clue__body__code" v-if="selectedClueCode">
        <aceeditor
          v-model="selectedClueCode"
          @init="editorInit"
          lang="javascript"
          theme="dracula"
          ref="clueCodeEditor"
        ></aceeditor>
      </div>
    </div>
  </b-modal>
</template>

<script src="./clue.js"></script>
<style src="./clue.scss" lang="scss"></style>
