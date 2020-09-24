<template>
  <div class="sidebar">
    <!-- Solution -->
    <font-awesome-icon
      id="sidebar-solution"
      class="sidebar__icon"
      :icon="['fas', 'life-ring']"
      @click="seeSolution"
    />
    <b-tooltip target="sidebar-solution" triggers="hover">Solución</b-tooltip>

    <!-- Analytics -->
    <font-awesome-icon
      id="sidebar-analytics"
      class="sidebar__icon"
      :icon="['fas', 'chart-bar']"
    />
    <b-tooltip target="sidebar-analytics" triggers="hover"
      >Estadisticas</b-tooltip
    >

    <!-- Search -->
    <font-awesome-icon
      id="sidebar-search"
      class="sidebar__icon"
      :icon="['fas', 'search']"
      @click="openModalSeach"
    />
    <b-tooltip target="sidebar-search" triggers="hover">Buscar</b-tooltip>
    <search></search>

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

    <!-- Config -->
    <font-awesome-icon
      id="sidebar-config"
      class="sidebar__icon"
      :icon="['fas', 'cog']"
    />
    <b-tooltip target="sidebar-config" title="Solución" triggers="hover"
      >Configuraciones</b-tooltip
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
      />
      <b-tooltip target="sidebar-user-img" triggers="hover">{{
        $store.getters.getCurrentUser.name
      }}</b-tooltip>
    </div>
  </div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.scss" lang="scss"></style>
