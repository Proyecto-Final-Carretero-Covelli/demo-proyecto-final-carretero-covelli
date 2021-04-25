<template>
  <div class="top-header">
    <div class="d-flex w-25">
      <img class="top-header__logo" src="../assets/logo-small-light.png" />
      <div class="top-header__controll">
        <div
          id="play-controll"
          class="top-header__controll-icon top-header__controll-icon--play"
          @click="$store.dispatch('play')"
        >
          <font-awesome-icon :icon="['fas', 'play']" />
          <b-tooltip
            target="play-controll"
            triggers="hover"
            :delay="tooltipDelay"
            >Ejecutar</b-tooltip
          >
        </div>

        <div v-if="$store.getters.isDebugging" class="d-flex">
          <div
            id="next-step-controll"
            class="top-header__controll-icon top-header__controll-icon--next-step"
            @click="$store.dispatch('nextStep')"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>

          <b-tooltip
            target="next-step-controll"
            triggers="hover"
            :delay="tooltipDelay"
            >Siguiente instrucción</b-tooltip
          >

          <div
            id="stop-controll"
            class="top-header__controll-icon top-header__controll-icon--stop"
            @click="$store.dispatch('stop')"
          >
            <font-awesome-icon :icon="['fas', 'stop']" />
          </div>

          <b-tooltip
            target="stop-controll"
            triggers="hover"
            :delay="tooltipDelay"
            >Detener ejecución</b-tooltip
          >
        </div>

        <div v-else class="d-flex">
          <div
            id="slow-mode-controll"
            class="top-header__controll-icon  top-header__controll-icon--slow"
            :class="{
              'top-header__controll-icon--running':
                $store.getters.isRunningCode,
            }"
            @click="$store.dispatch('runInSlowMode')"
          >
            <font-awesome-icon :icon="['fas', 'clock']" />
          </div>

          <b-tooltip
            target="slow-mode-controll"
            triggers="hover"
            :delay="tooltipDelay"
            >Ejecutar (Modo Lento)
          </b-tooltip>
          <div
            id="debug-mode-controll"
            class="top-header__controll-icon  top-header__controll-icon--debug"
            @click="$store.dispatch('runInDebugMode')"
          >
            <font-awesome-icon :icon="['fas', 'bug']" />
          </div>

          <b-tooltip
            target="debug-mode-controll"
            triggers="hover"
            :delay="tooltipDelay"
            >Ejecutar (Modo Manual)
          </b-tooltip>
        </div>

        <div
          v-if="$store.getters.isRunningCode"
          class="top-header__controll-icon"
        >
          <span> Ejecutando... </span>
          <b-spinner
            small
            type="grow"
            label="Loading..."
            class="top-header__controll-icon"
          ></b-spinner>
        </div>
      </div>
    </div>

    <div class="top-header__title w-50">
      <div
        v-if="$store.getters.getTitle !== null"
        class="d-flex justify-content-center align-items-center"
      >
        <p @click="toggleTitleShow">{{ $store.getters.getTitle }}</p>
        <font-awesome-icon
          v-if="
            $store.getters.getResizeTitle &&
              $store.getters.getResizeTitle.percent <= 1
          "
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-down']"
          @click="toggleTitleShow"
        />
        <font-awesome-icon
          v-if="
            $store.getters.getResizeTitle &&
              $store.getters.getResizeTitle.percent > 1
          "
          class="top-header__controll-icon top-header__title--shows"
          :icon="['fas', 'angle-up']"
          @click="toggleTitleShow"
        />
      </div>
    </div>

    <div class="top-header__right w-25">
      <b-dropdown
        v-if="$store.getters.getTitle !== null"
        id="dropdown-1"
        text="Opciones"
        class="m-md-2 btn-drop-down"
        right
      >
        <b-dropdown-item @click="closeExercise"
          >Cerrar Ejercicio</b-dropdown-item
        >
      </b-dropdown>
    </div>
  </div>
</template>

<script src="./top-header.js"></script>
<style src="./top-header.scss" lang="scss"></style>
