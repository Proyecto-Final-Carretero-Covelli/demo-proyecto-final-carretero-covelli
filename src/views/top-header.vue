<template>
  <div class="top-header">
    <div class="w-25">
      <img class="top-header__logo" src="../assets/logo-small-light.png" />
    </div>

    <div class="top-header__title w-50">
      <div
        v-if="$store.getters.getTitle !== null"
        class="d-flex justify-content-center align-items-center"
      >
        <p>{{ $store.getters.getTitle }}</p>
        <font-awesome-icon
          v-if="$store.getters.getResizeTitle && $store.getters.getResizeTitle.percent <= 1"
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-down']"
          @click="toggleTitleShow"
        />
        <font-awesome-icon
          v-if="$store.getters.getResizeTitle && $store.getters.getResizeTitle.percent > 1"
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-up']"
          @click="toggleTitleShow"
        />
      </div>
    </div>

    <div class="top-header__controll w-25">

      <div v-if="$store.getters.isRunningCode" class="top-header__controll-icon">
        <span> Cargando... </span>
        <b-spinner small type="grow" label="Loading..." class="top-header__controll-icon"></b-spinner>
      </div>
      
      <font-awesome-icon
        class="top-header__controll-icon top-header__controll-icon--play"
        :icon="['fas', 'play']"
        @click="$store.dispatch('play')"
      />

      <div v-if="$store.getters.isDebugging">
        <font-awesome-icon class="top-header__controll-icon" :icon="['fas', 'arrow-right']" @click="$store.dispatch('nextStep')"/>
        <font-awesome-icon
          class="top-header__controll-icon top-header__controll-icon--stop"
          :icon="['fas', 'stop']" @click="$store.dispatch('stop')"
        />
      </div>

      <div v-else>
        <font-awesome-icon class="top-header__controll-icon" :icon="['fas', 'clock']" @click="$store.dispatch('runInSlowMode')" />
        <font-awesome-icon class="top-header__controll-icon" :icon="['fas', 'bug']" @click="$store.dispatch('runInDebugMode')" />
      </div>
      
    </div>
  </div>
</template>

<script src="./top-header.js"></script>
<style src="./top-header.scss" lang="scss"></style>
