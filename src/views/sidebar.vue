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

    <font-awesome-icon
      v-if="!$store.getters.getCurrentUser"
      class="sidebar__icon"
      :icon="['fas', 'user']"
    />
    <div v-else>
      <img
        id="sidebar-user-img"
        v-bind:src="$store.getters.getCurrentUser.photoURL"
        class="sidebar__user"
      />
      <b-tooltip target="sidebar-user-img" triggers="hover">{{ $store.getters.getCurrentUser.name }}</b-tooltip>
    </div>
  </div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.scss" lang="scss"></style>
