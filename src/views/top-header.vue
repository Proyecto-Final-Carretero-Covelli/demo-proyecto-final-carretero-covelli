<template>
  <div class="top-header">
    <div class="w-25">
      <img class="top-header__logo" src="../assets/logo-small-light.png" />
    </div>

    <div class="top-header__title w-50">
      <div class="d-flex justify-content-center align-items-center">
        <p>{{ $store.getters.getTitle }}</p>
        <font-awesome-icon
          v-if="$store.getters.getResizeTitle.percent <= 1"
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-down']"
          @click="toggleTitleShow"
        />
        <font-awesome-icon
          v-if="$store.getters.getResizeTitle.percent > 1"
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-up']"
          @click="toggleTitleShow"
        />
      </div>
    </div>

    <div class="top-header__controll w-25">
      <font-awesome-icon
        class="top-header__controll-icon top-header__controll-icon--play"
        :icon="['fas', 'play']"
        @click="$store.dispatch('play', true)"
      />
      <font-awesome-icon
        class="top-header__controll-icon top-header__controll-icon--stop"
        :icon="['fas', 'stop']"
      />
      <font-awesome-icon
        class="top-header__controll-icon"
        :icon="['fab', 'angellist']"
      />
    </div>
  </div>
</template>

<script src="./top-header.js"></script>
<style src="./top-header.scss" lang="scss"></style>
