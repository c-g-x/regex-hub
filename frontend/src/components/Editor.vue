<script setup lang="ts">
import CodeMirrorEditor from './CodeMirrorEditor.vue'
import { SIMPLE_CASES_QUERY } from '../types/query'
// @ts-ignore
import { parse, Kit, Raphael, visualize } from 'regulex_common'
import FlagIcon from './icons/FlagIcon.vue'
import RandExp from 'randexp'

const { result } = useQuery(SIMPLE_CASES_QUERY)
const caseList = useResult(result, [])

const regex = ref('')
const flags = ref([])
const flagOptions = [
  {
    label: 'ignore case (i)',
    value: 'i',
  },
  {
    label: 'global (g)',
    value: 'g',
  },
  {
    label: 'multiline (m)',
    value: 'm',
  },
]

let paper: Raphael = null

onMounted(() => {
  paper = Raphael('regex-image', 0, 0)
})

/**
 * 可视化 regex expression
 */
function visualizeRegex(): void {
  if (isValidRegex.value) {
    const regExp = new RegExp(regex.value, viewFlags.value)
    try {
      visualize(parse(regExp.source, false), getRegexFlags(regExp), paper)
    } catch (e) {
      if (e instanceof parse.RegexSyntaxError) {
        alert('generate failed')
      }
    }
  }
}

function getRegexFlags(re: RegExp): string {
  let flags = ''
  flags += re.ignoreCase ? 'i' : ''
  flags += re.global ? 'g' : ''
  flags += re.multiline ? 'm' : ''
  return flags
}

function changeHeightLight(): void {
  visualizeRegex()
}

/**
 * 视图中的 flags
 */
const viewFlags = computed(() => flags.value.join(''))

/**
 * 标记正则表达式是否合法
 */
const isValidRegex = computed(() => {
  if (!regex.value || regex.value.length === 0) {
    return false
  }

  try {
    new RegExp(regex.value, viewFlags.value)
  } catch (e) {
    return false
  }
  return true
})

/**
 * 随机生成正则表达式用例
 */
const generateRandomExp = () => RandExp.randexp(regex.value)
</script>

<template>
  <n-grid cols="1 800:3" x-gap="16" y-gap="16" item-responsive>
    <n-gi span="1 800:2">
      <n-space vertical>
        <n-input placeholder="请输入正则表达式" class="text-left" @input="changeHeightLight" maxlength="1000" v-model:value="regex">
          <template #prefix>/</template>
          <template #suffix>
            <span>/</span>
            <n-popselect v-model:value="flags" multiple :options="flagOptions">
              <div class="flex items-center">
                <span id="flags" class="mx-1 cursor-pointer">{{ viewFlags }}</span>
                <n-icon class="cursor-pointer" :component="FlagIcon" />
              </div>
            </n-popselect>
          </template>
        </n-input>

        <div class="text-left mt-1 select-none">Test String</div>
        <CodeMirrorEditor />

        <div id="regex-image" v-show="isValidRegex"></div>
      </n-space>
    </n-gi>
    <n-gi>
      <n-space vertical>
        <n-card v-if="isValidRegex" title="匹配串生成器" class="bg-opacity-50" embedded>
          {{ RandExp.randexp(regex) }}
          <template #action>
            <n-button @click="generateRandomExp" class="w-full text-white" type="success" strong secondary>重新生成</n-button>
          </template>
        </n-card>

        <n-list bordered>
          <template #header>推荐列表</template>
          <n-list-item v-for="aCase in caseList">
            <n-thing :title="aCase.title" />
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<style>
#regex-image {
  @apply w-full bg-neutral-200 rounded overflow-auto py-4;
}
#regex-image svg {
  @apply my-0 mx-auto;
}
</style>
