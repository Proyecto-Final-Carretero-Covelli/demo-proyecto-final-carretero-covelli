<template>
  <div class="m-2 console">
    <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-bin" @click="$store.dispatch('clearConsole')" />
    Console
    <div class="console-content">
      <span v-html="$store.getters.getConsoleOutput"></span>
    </div>
  </div>
</template>

<script src="./console.js"></script>
<style src="./console.scss" lang="scss"></style>
