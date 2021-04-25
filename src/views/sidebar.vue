<template>
  <div class="sidebar">
    <!-- New Exercise -->
    <font-awesome-icon
      id="sidebar-new-exercise"
      class="sidebar__icon"
      :icon="['far', 'plus-square']"
      @click="openModalNewExercise"
    />
    <b-tooltip target="sidebar-new-exercise" triggers="hover"
      >Crear Ejercicio</b-tooltip
    >
    <new-exercise></new-exercise>

    <!-- Search -->
    <font-awesome-icon
      id="sidebar-search"
      class="sidebar__icon"
      :icon="['fas', 'search']"
      @click="openModalSearch"
    />
    <b-tooltip target="sidebar-search" triggers="hover">Buscar</b-tooltip>
    <search></search>

    <!-- Solution -->
    <font-awesome-icon
      id="sidebar-solution"
      class="sidebar__icon"
      :class="{ disabled: !cluesOrSolution }"
      :icon="['fas', 'life-ring']"
      @click="seeSolution"
    />
    <b-tooltip target="sidebar-solution" triggers="hover"
      >Solución y Pistas</b-tooltip
    >
    <clue></clue>

    <!-- Analytics -->
    <font-awesome-icon
      id="sidebar-analytics"
      class="sidebar__icon"
      :class="{ disabled: !selectedExerciseStadistics }"
      :icon="['fas', 'chart-bar']"
      @click="openModalAnalytics"
    />
    <b-tooltip target="sidebar-analytics" triggers="hover"
      >Estadisticas</b-tooltip
    >
    <analytics></analytics>

    <!-- Config -->
    <font-awesome-icon
      id="sidebar-config"
      class="sidebar__icon"
      :icon="['fas', 'download']"
      @click="downloadCode"
    />
    <b-tooltip target="sidebar-config" title="Solución" triggers="hover"
      >Descargar Ejercicio</b-tooltip
    >

    <!-- User -->
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
        @click="openModalAccount"
      />
      <b-tooltip target="sidebar-user-img" triggers="hover">{{
        $store.getters.getCurrentUser.name
      }}</b-tooltip>
      <account></account>
    </div>
  </div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.scss" lang="scss"></style>
