<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { NConfigProvider, darkTheme } from 'naive-ui'

export default {
  name: 'app',
  components: { NConfigProvider },
  data() {
    return {
      theme: darkTheme,
    }
  },
}
</script>

<template>
  <n-config-provider :theme="theme" style="height: 100%">
    <router-view />
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
