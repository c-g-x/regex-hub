<script setup lang="ts">
import {ref} from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NPageHeader,
  NAvatar,
  NSpace,
  NButton,
  NCard,
  NH1,
  NH2,
    NH3,
  NGrid,
  NGridItem,
  NConfigProvider,
} from 'naive-ui'

// defineProps<{ msg: string }>()

const count = ref(0)
const caseList = ref([
  {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  }, {
    _id: 1,
    title: "匹配 div 标签",
    re: "<div>.*</div>"
  },
])
const re = ref(`<div>.*</div>`)
</script>

<template>
  <n-layout style="height: 100%">
    <n-layout-header :border="true" style="padding: 24px">
      <n-page-header>
        <template #title>
          Regex Hub
        </template>
        <template #avatar>
          <n-avatar src="/public/favicon.svg"/>
        </template>
        <template #extra>
          <n-space>
            <n-button>登录</n-button>
            <n-button>关于</n-button>
          </n-space>
        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <n-card>
        <template #header>
          <n-h1>受欢迎的正则列表</n-h1>
        </template>
        <n-grid x-gap="16" y-gap="16" :cols="4">
          <n-grid-item v-for="caseItem in caseList">
            <n-config-provider :theme="caseItem.theme">
              <n-card hoverable @mouseenter="caseItem.theme = darkTheme" @mouseleave="darkTheme">
                <template #header>
                  <n-h2>
                    {{ caseItem.title }}
                  </n-h2>
                </template>
                <n-h3>
                  {{ caseItem.re }}

                </n-h3>
              </n-card>
            </n-config-provider>
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-layout-content>
    <n-layout-footer>Copyright @ 2022-2022 ChenGuixin</n-layout-footer>
  </n-layout>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
