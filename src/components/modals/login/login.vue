<template>
  <b-modal
    id="modal-login"
    content-class="login"
    hide-header
    hide-footer
    centered
    no-close-on-backdrop
  >
    <div class="login__container">
      <div class="login__header">
        <img src="../../../assets/logo-medium-light.png" alt="VIDE Logo" />
        <h2>VIDE</h2>
      </div>

      <h3 class="login__body">Bienvenido ! 👋🏼</h3>

      <div class="login__footer">
        <h5>
          Registrate para comenzar a practicar!
        </h5>

        <div class="login__footer__google" @click="login()">
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>Ingresar con Google</p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script src="./login.js"></script>
<style src="./login.scss" lang="scss"></style>
