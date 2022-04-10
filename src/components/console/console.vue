<template>
  <div class="console">
    <font-awesome-icon
      :icon="['fas', 'trash-alt']"
      class="console__trash-bin"
      @click="$store.dispatch('clearConsole')"
    />
    Consola
    <div class="console__list">
      <span v-html="$store.getters.getConsoleOutput"></span>
    </div>
  </div>
</template>

<script src="./console.js"></script>
<style src="./console.scss" lang="scss"></style>
