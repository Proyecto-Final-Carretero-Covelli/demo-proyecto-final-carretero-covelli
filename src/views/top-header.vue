<template>
  <div class="top-header">
    <div class="w-25">

      <img class="top-header__logo" src="../assets/logo-small-light.png" />

      <b-dropdown text="Ejercicios" id="dropdown-left" size="sm" class="m-2 top-header__drop" no-caret>
        <b-dropdown-group v-for="(folderValue, folderId) in folders" :key="folderId">
          <span class="dropdown-header"> {{ folderValue.name }} </span>
          <b-dropdown-item class="subitem" v-for="(exerciseValue, exerciseId) in folderValue.exercises" :key="exerciseId" @click="selectExercise(exerciseValue)">
            {{ exerciseValue.name }}
          </b-dropdown-item>
        </b-dropdown-group>
      </b-dropdown>
      
      <b-dropdown text="Ayuda" id="dropdown-left" size="sm" class="m-2 top-header__drop" no-caret>
        <b-dropdown-item :disabled="!$store.getters.getCurrentExercise.solution" @click="seeSolution()">
          Ver solucion
        </b-dropdown-item>
      </b-dropdown>
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
        @click="$store.dispatch('play')"
      />
      <font-awesome-icon
        class="top-header__controll-icon top-header__controll-icon--stop"
        :icon="['fas', 'stop']"
      />
      <font-awesome-icon class="top-header__controll-icon" :icon="['fab', 'angellist']" />
      <font-awesome-icon v-if="!$store.getters.getCurrentUser" class="top-header__controll-icon" :icon="['fas', 'user']" />
      <div v-else>
        <img id="user-img" v-bind:src="$store.getters.getCurrentUser.photoURL" class="top-header__controll-icon--user" />
        <b-tooltip target="user-img" triggers="hover">
          {{ $store.getters.getCurrentUser.name }}
        </b-tooltip>
      </div>
      
    </div>
  </div>
</template>

<script src="./top-header.js"></script>
<style src="./top-header.scss" lang="scss"></style>
