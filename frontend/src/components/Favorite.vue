<template>
  <n-space vertical>
    <n-card class="text-left">
      <n-skeleton v-if="loading" text :repeat="6" />
      <template v-else>
        <n-h2 prefix="bar" type="success">
          <n-text type="success">我的收藏</n-text>
        </n-h2>
        <div
          class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          v-if="userInfo.favorite.length"
        >
          <n-card :title="aCase.title" v-for="aCase in userInfo.favorite" hoverable :key="aCase._id" />
        </div>
        <n-gradient-text
          v-else
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
        >
          这里空空的什么也没有
        </n-gradient-text>
      </template>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { GET_USER } from '../types/query'

const route: RouteLocationNormalized = useRoute()

const { result, loading } = useQuery(GET_USER, { id: route.params.id })
const userInfo = useResult(result, {})
</script>

<style scoped></style>
