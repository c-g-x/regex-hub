<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useMessage } from 'naive-ui'
import GithubCorner from './GithubCorner.vue'
import ProfileIcon from './icons/ProfileIcon.vue'
import AddIcon from './icons/AddIcon.vue'
import StarIcon from './icons/StarIcon.vue'
import { LOGIN, REGISTER } from '../types/query'

const router = useRouter()
const mode = reactive({
  isLogin: false,
  showLoginModal: false,
  isRegisterMode: false,
})
const userParam = reactive({
  username: '',
  password: '',
  passwordAgain: '',
})
let userInfo = ref({})

const { result } = useQuery(LOGIN, userParam)

let message = useMessage()
function login() {
  if (userParam.username.length === 0 || userParam.password.length === 0) {
    return message.info(`用户名或密码不能为空`)
  }

  userInfo = useResult(result, {})

  if (userInfo.value) {
    message.success(`登录成功，${userInfo.value.username}`)
    mode.isLogin = true
    mode.showLoginModal = false
  } else {
    message.error(`登录失败，用户名或密码错误`)
  }
}

const { mutate: registerMutate, onDone: onRegistered } = useMutation(REGISTER, () => ({
  variables: userParam,
}))
function register() {
  if (userParam.username.length === 0 || userParam.password.length === 0) {
    return message.info(`用户名或密码不能为空`)
  }

  if (userParam.password !== userParam.passwordAgain) {
    return message.error(`重复输入密码不一致，请确认`)
  }

  registerMutate()
}
onRegistered(({ data: { registerUser } }) => {
  if (registerUser) {
    userInfo.value = registerUser
    message.success(`登录成功，${userInfo.value.username}`)
    mode.showLoginModal = false
    mode.isLogin = true
  } else {
    message.error(`注册失败，该用户已存在`)
  }
})

function toIndex() {
  router.push('/')
}

function toProfile() {
  router.push(`/profile/${userInfo.value._id}`)
}

function toFavorite() {
  router.push(`/favorite/${userInfo.value._id}`)
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

            <n-button v-if="!mode.isLogin" @click=";(mode.showLoginModal = true) && (mode.isRegisterMode = false)">
              登录
            </n-button>
            <n-button-group v-else>
              <n-button ghost>
                <template #icon>
                  <n-icon :component="AddIcon" />
                </template>
                创作
              </n-button>
              <n-button ghost @click="toFavorite">
                <template #icon>
                  <n-icon :component="StarIcon" />
                </template>
                收藏
              </n-button>
              <n-button round @click="toProfile">
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
      <n-input
        v-model:value="userParam.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="mousedown"
      />
    </n-form-item>
    <n-form-item label="重复密码" v-if="mode.isRegisterMode">
      <n-input
        v-model:value="userParam.passwordAgain"
        placeholder="请再次输入密码"
        type="password"
        show-password-on="mousedown"
      />
    </n-form-item>

    <template #footer>
      <n-space vertical v-if="mode.isRegisterMode" key="register">
        <n-button quaternary type="info" class="w-full" @click="register">注册</n-button>
      </n-space>
      <n-space vertical v-else key="login">
        <n-button strong secondary type="primary" class="w-full" @click="login"> 登录 </n-button>
        <n-button quaternary type="info" class="w-full" @click="mode.isRegisterMode = true">没有账号？注册</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
