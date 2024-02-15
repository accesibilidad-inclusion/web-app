<script setup lang="ts"></script>

<template>
  <div class="spinner-container">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss">
.spinner-container {
  position: absolute;
  top: 0;
  max-height: 100svh;
  aspect-ratio: 320/568;
  max-width: 540px;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #cae0ff, $alpha: 0.5);
  width: 100%;
  @media screen and (min-width: 560px) {
    max-width: 540px;
  }
  /* @media screen and (min-width: 1280px) {
    max-width: 495px;
  } */
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #004079;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #004079 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
