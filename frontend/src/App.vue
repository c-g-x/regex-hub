<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { darkTheme } from 'naive-ui'
import Frame from './components/Frame.vue'

const theme = ref(darkTheme)
</script>

<template>
  <n-config-provider :theme="theme" class="h-full">
    <n-message-provider>
      <Frame />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html,
body {
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