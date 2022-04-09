<script setup>
import { CASES_QUERY } from '../types/query.ts'

const { result } = useQuery(CASES_QUERY)
const caseList = useResult(result, [])
</script>

<template>
  <n-card>
    <template #header>
      <n-h1>受欢迎的正则列表</n-h1>
    </template>
    <n-grid x-gap="16" y-gap="16" cols="1 640:1 768:2 1024:3 1280:4">
      <n-grid-item v-for="caseItem in caseList">
        <n-config-provider :theme="caseItem.theme" class="group">
          <n-card hoverable class="group-hover:bg-white">
            <template #header>
              <n-h2 class="cursor-pointer group-hover:text-black">
                {{ caseItem.title }}
              </n-h2>
            </template>
            <n-h3 class="group-hover:text-black">
              {{ caseItem.re }}
            </n-h3>
          </n-card>
        </n-config-provider>
      </n-grid-item>
    </n-grid>
  </n-card>
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
