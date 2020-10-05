<template>
  <b-modal
    id="modal-login"
    content-class="login"
    hide-header
    hide-footer
    centered
    no-close-on-backdrop
  >
    <div
      class="d-flex h-100 flex-column justify-content-between align-items-center p-3"
    >
      <div class="d-flex align-items-center mb-3">
        <img
          style="max-height: 100px"
          src="../../../assets/logo-medium-light.png"
          alt="VIDE Logo"
        />
        <h2 class="ml-3">VIDE</h2>
      </div>

      <h3 class="mb-3">Bienvenido ! 👋🏼</h3>

      <div
        class="w-100 d-flex flex-column justify-content-center align-items-center"
      >
        <h5 style="margin-top: 3rem; margin-bottom: 1rem; font-weight: 300">
          Registrate para comenzar a practicar!
        </h5>

        <div class="d-flex w-100 login__google" @click="login()">
          <font-awesome-icon :icon="['fab', 'google']" />
          <p class="ml-3 mb-0">Ingresar con Google</p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script src="./login.js"></script>
<style src="./login.scss" lang="scss"></style>