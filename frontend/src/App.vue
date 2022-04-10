<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { darkTheme } from 'naive-ui'
import GithubCorner from './components/GithubCorner.vue'

const isLogin = ref(false)
const showLoginModal = ref(false)
const username = ref('')
const password = ref('')

function login() {
  // TODO: 1. check username and password
  // TODO: 2. request server
  isLogin.value = true
  showLoginModal.value = false
}

const theme = ref(darkTheme)
</script>

<template>
  <n-config-provider :theme="theme" class="h-full">
    <n-layout class="h-full">
      <n-layout-header border class="p-6">
        <n-page-header>
          <template #title> Regex Hub </template>
          <template #avatar>
            <n-avatar src="/public/favicon.svg" />
          </template>
          <template #extra>
            <GithubCorner />
            <n-space class="mr-10">
              <n-button>关于</n-button>

              <n-button v-if="!isLogin" @click="showLoginModal = true">登录</n-button>
              <n-button-group v-else>
                <n-button ghost>
                  <template #icon>
                    <n-icon>
                      <svg t="1648139684595" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3645" width="200" height="200">
                        <path
                          d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"
                          p-id="3646"
                        />
                      </svg>
                    </n-icon>
                  </template>
                  创作
                </n-button>
                <n-button ghost>
                  <template #icon>
                    <n-icon>
                      <svg t="1648139587490" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2164" width="200" height="200">
                        <path
                          d="M716.8 883.2c-6.4 0-19.2 0-25.6-6.4L512 755.2l-179.2 121.6c-19.2 12.8-38.4 12.8-57.6 0-19.2-12.8-25.6-32-19.2-51.2L320 614.4 147.2 480C134.4 467.2 128 448 134.4 428.8c6.4-19.2 25.6-32 44.8-32L390.4 384l76.8-204.8c12.8-38.4 76.8-38.4 89.6 0l0 0L633.6 384l217.6 6.4c19.2 0 38.4 12.8 44.8 32 6.4 19.2 0 38.4-19.2 51.2L704 614.4l57.6 211.2c6.4 19.2 0 38.4-19.2 51.2C736 876.8 729.6 883.2 716.8 883.2zM512 684.8c6.4 0 12.8 0 19.2 6.4l166.4 115.2-57.6-192C640 595.2 640 582.4 652.8 576l160-128L608 448C595.2 448 582.4 435.2 582.4 422.4L512 236.8l-70.4 192C441.6 435.2 428.8 448 416 448L211.2 454.4l160 128C384 582.4 384 595.2 384 608l-57.6 192 166.4-115.2C499.2 684.8 505.6 684.8 512 684.8z"
                          p-id="2165"
                        ></path>
                      </svg>
                    </n-icon>
                  </template>
                  收藏
                </n-button>
                <n-button round>
                  <template #icon>
                    <n-icon>
                      <svg t="1648139741513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="200" height="200">
                        <path
                          d="M808.854477 375.633193c0-163.997098-134.543276-296.918433-300.536844-296.918433-165.995615 0-300.536844 132.921335-300.536844 296.918433 0 94.696756 45.01831 178.827875 114.873284 233.189993-125.261888 63.085804-213.430974 188.69357-223.198431 334.665129l44.950771 0c10.544147-136.692219 99.246375-257.717619 223.043912-305.83143 39.333844 18.691711 94.296643 34.896788 140.867308 34.896788 46.571688 0 90.499154-10.767228 129.836067-29.455869l30.833239-17.869996 24.970718-16.403598C763.838214 554.461067 808.854477 470.329948 808.854477 375.633193zM508.316609 624.184035c-138.957819 0-251.590062-111.277386-251.590062-248.570285 0-137.251967 112.632243-248.550843 251.590062-248.550843 138.957819 0 251.613598 111.298875 251.613598 248.550843C759.930207 512.904603 652.85554 624.184035 508.316609 624.184035zM762.570337 652.440589l-0.221034 0.312108c-4.907777-4.683672-11.453866-7.633864-18.779715-7.633864-15.117302 0-27.347858 5.746888-27.347858 20.863167 0 10.431583 6.037507 19.178805 14.603603 23.786753l-0.177032 0.268106c82.176604 58.731636 123.620505 147.655921 131.789559 253.452479l54.738695 0C909.319609 825.970808 850.562391 721.331609 762.570337 652.440589z"
                          p-id="4449"
                        />
                      </svg>
                    </n-icon>
                  </template>
                  我的
                </n-button>
              </n-button-group>
            </n-space>
          </template>
        </n-page-header>
      </n-layout-header>
      <n-layout-content class="p-6">
        <router-view />
      </n-layout-content>
      <n-layout-footer class="p-2">MIT License © 2022 ChenGuixin</n-layout-footer>
    </n-layout>

    <n-modal v-model:show="showLoginModal" style="width: 400px" preset="card">
      <template #header> Regex Hub </template>

      <n-form-item label="用户名">
        <n-input v-model:value="username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码">
        <n-input v-model:value="password" placeholder="请输入密码" />
      </n-form-item>

      <template #footer>
        <n-space vertical>
          <n-button strong secondary type="primary" class="w-full" @click="login"> 登录 </n-button>
          <n-button quaternary type="info" class="w-full">没有账号？注册</n-button>
        </n-space>
      </template>
    </n-modal>
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
