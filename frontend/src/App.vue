<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Index from './components/Index.vue'
import {NConfigProvider, darkTheme} from 'naive-ui'
import {ref} from "vue";

const theme = ref(darkTheme);
</script>

<template>
  <n-config-provider :theme="theme" style="height: 100%">
    <Index/>
  </n-config-provider>
</template>

<style>
/*.n-layout.n-layout--static-positioned*/
html, body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
