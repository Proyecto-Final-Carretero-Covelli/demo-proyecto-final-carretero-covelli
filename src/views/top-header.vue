<template>
  <div class="top-header ">
    <div class="w-25">
      <img class="top-header__logo" src="../assets/logo-small-light.png" />
      <b-dropdown
        text="File"
        id="dropdown-left"
        size="sm"
        class="m-2 top-header__drop"
        no-caret
      >
        <b-dropdown-item href="#">Action</b-dropdown-item>
        <b-dropdown-item href="#">Another action</b-dropdown-item>
        <b-dropdown-item href="#">Something else here</b-dropdown-item>
      </b-dropdown>
      <b-dropdown
        text="Edit"
        id="dropdown-left"
        size="sm"
        class="m-2 top-header__drop"
        no-caret
      >
        <b-dropdown-item href="#">Action</b-dropdown-item>
        <b-dropdown-item href="#">Another action</b-dropdown-item>
        <b-dropdown-item href="#">Something else here</b-dropdown-item>
      </b-dropdown>
      <b-dropdown
        text="Selection"
        id="dropdown-left"
        size="sm"
        class="m-2 top-header__drop"
        no-caret
      >
        <b-dropdown-item href="#">Action</b-dropdown-item>
        <b-dropdown-item href="#">Another action</b-dropdown-item>
        <b-dropdown-item href="#">Something else here</b-dropdown-item>
      </b-dropdown>
      <b-dropdown
        text="Help"
        id="dropdown-left"
        size="sm"
        class="m-2 top-header__drop"
        no-caret
      >
        <b-dropdown-item href="#">Action</b-dropdown-item>
        <b-dropdown-item href="#">Another action</b-dropdown-item>
        <b-dropdown-item href="#">Something else here</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="top-header__title w-50">
      <p>{{ $store.getters.getTitle }}</p>
    </div>

    <div class="top-header__controll w-25">
      <font-awesome-icon
        class="top-header__controll-icon"
        :icon="['fas', 'play']"
      />
      <font-awesome-icon
        class="top-header__controll-icon"
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
