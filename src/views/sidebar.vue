<template>
  <div class="sidebar">
    <font-awesome-icon
      class="sidebar__icon"
      :icon="['far', 'plus-square']"
      id="show-btn"
      @click="openModelNewExercise"
    />
    <new-exercise></new-exercise>
    <font-awesome-icon class="sidebar__icon" :icon="['fas', 'cog']" />
    <font-awesome-icon class="sidebar__icon" :icon="['fas', 'chart-bar']" />
    <font-awesome-icon class="sidebar__icon" :icon="['fas', 'life-ring']" />
  </div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.scss" lang="scss"></style>
