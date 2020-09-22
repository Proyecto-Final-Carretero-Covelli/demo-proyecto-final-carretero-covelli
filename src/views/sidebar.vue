<template>
  <div class="sidebar">
    <font-awesome-icon id="sidebar-help" class="sidebar__icon" :icon="['fas', 'life-ring']" />
    <b-tooltip target="sidebar-help">Solución</b-tooltip>

    <font-awesome-icon id="sidebar-analytics" class="sidebar__icon" :icon="['fas', 'chart-bar']" />
    <b-tooltip target="sidebar-analytics">Estadisticas</b-tooltip>
    <font-awesome-icon id="sidebar-search" class="sidebar__icon" :icon="['fas', 'search']" />
    <b-tooltip target="sidebar-search">Buscar</b-tooltip>

    <font-awesome-icon
      id="sidebar-new-exercise"
      class="sidebar__icon"
      :icon="['far', 'plus-square']"
      @click="openModelNewExercise"
    />
    <b-tooltip target="sidebar-new-exercise">Crear Ejercicio</b-tooltip>
    <new-exercise></new-exercise>

    <font-awesome-icon id="sidebar-config" class="sidebar__icon" :icon="['fas', 'cog']" />
    <b-tooltip target="sidebar-config" title="Solución">Configuraciones</b-tooltip>

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
      <b-tooltip target="sidebar-user-img">{{ $store.getters.getCurrentUser.name }}</b-tooltip>
    </div>
  </div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.scss" lang="scss"></style>
