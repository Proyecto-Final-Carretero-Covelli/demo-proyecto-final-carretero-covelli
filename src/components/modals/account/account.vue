<template>
  <b-modal
    id="modal-account"
    content-class="account"
    body-class="account__body"
    hide-header
    hide-footer
    centered
  >
    <div class="account__close-modal" @click="closeModal">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="d-flex align-items-center flex-column">
      <img
        class="account__img"
        v-bind:src="$store.getters.getCurrentUser.photoURL"
      />
      <p class="mt-3 mb-1 account__name">
        {{ $store.getters.getCurrentUser.name }}
      </p>
      <p>{{ $store.getters.getCurrentUser.email }}</p>
    </div>

    <b-button variant="danger" class="account__sign-out" @click="signOut">
      Cerrar Sesión
    </b-button>
  </b-modal>
</template>

<script src="./account.js"></script>
<style src="./account.scss" lang="scss"></style>