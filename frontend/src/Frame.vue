<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useMessage } from 'naive-ui'
import GithubCorner from './components/GithubCorner.vue'
import ProfileIcon from './components/icons/ProfileIcon.vue'
import AddIcon from './components/icons/AddIcon.vue'
import StarIcon from './components/icons/StarIcon.vue'
import { LOGIN } from './types/query'

const router = useRouter()
const mode = reactive({
  isLogin: false,
  showLoginModal: false,
  isRegisterMode: false,
  enabledRequest: false,
})
const userParam = reactive({
  username: '',
  password: '',
})
let userInfo = ref({})

const { result } = useQuery(LOGIN, userParam, () => ({
  enabled: mode.enabledRequest,
}))
userInfo.value = useResult(result, {})
console.log(userInfo.value)

let message = useMessage()
function login() {
  if (userParam.username.length === 0 || userParam.password.length === 0) {
    return message.info(`用户名或密码不能为空`)
  }
  mode.enabledRequest = true

  if (result.value) {
    message.success(`登录成功，${result.loginUser.username}`)
    mode.isLogin = true
    mode.showLoginModal = false
  } else {
    message.error(`登录失败，用户名或密码错误`)
  }
  mode.enabledRequest = false
}

function toIndex() {
  router.push('/')
}
</script>

<template>
  <n-layout class="h-full">
    <n-layout-header border class="p-6">
      <n-page-header>
        <template #title> <div class="select-none cursor-pointer" @click="toIndex">Regex Hub</div> </template>
        <template #avatar>
          <n-avatar src="/public/favicon.svg" class="select-none cursor-pointer" @click="toIndex" />
        </template>
        <template #extra>
          <GithubCorner />
          <n-space class="mr-10">
            <n-button>关于</n-button>

            <n-button v-if="!mode.isLogin" @click="mode.showLoginModal = true">登录</n-button>
            <n-button-group v-else>
              <n-button ghost>
                <template #icon>
                  <n-icon :component="AddIcon" />
                </template>
                创作
              </n-button>
              <n-button ghost>
                <template #icon>
                  <n-icon :component="StarIcon" />
                </template>
                收藏
              </n-button>
              <n-button round>
                <template #icon>
                  <n-icon :component="ProfileIcon" />
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

  <n-modal v-model:show="mode.showLoginModal" style="width: 400px" preset="card">
    <template #header> Regex Hub </template>

    <n-form-item label="用户名">
      <n-input v-model:value="userParam.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input v-model:value="userParam.password" placeholder="请输入密码" />
    </n-form-item>

    <template #footer>
      <n-space vertical>
        <n-button strong secondary type="primary" class="w-full" @click="login"> 登录 </n-button>
        <n-button quaternary type="info" class="w-full" @click="register">没有账号？注册</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
