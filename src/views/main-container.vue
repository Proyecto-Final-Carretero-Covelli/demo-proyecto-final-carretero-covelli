<template>
  <div class="main-container">
    <top-header></top-header>
    <sidebar></sidebar>
    <middle-container></middle-container>
    <modal :width="300" :height="300" :clickToClose="false" name="login-modal">
        <div>       
            <div id="partition-register" class="partition">
              <div class="partition-title">LOGIN WITH GOOGLE</div> 
              <img id="google-icon" src="https://img.icons8.com/bubbles/452/google-logo.png" lazy="loaded" @click="login()">
            </div>         
        </div>
    </modal>
  </div>
</template>

<script src="./main-container.js"></script>
<style src="./main-container.scss" lang="scss"></style>
