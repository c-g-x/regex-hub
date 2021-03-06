<script setup lang="ts">
import CodeMirrorEditor from './CodeMirrorEditor.vue'
import { nextTick } from 'vue'
import { SIMPLE_CASES_QUERY } from '../types/query'
// @ts-ignore
import { parse, Kit, Raphael, visualize } from 'regulex_common'
import FlagIcon from './icons/FlagIcon.vue'
import RandExp from 'randexp'

// @ts-ignore
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const route = useRoute()

const caseId = route.params.caseId
const author = route.query.author

const isDetail = computed(() => !!caseId && !!author)
const canModify = computed(() => isDetail && userStore.userId === author)


console.log(caseId, author)

const codeMirrorEditorRef = ref()

const { result } = useQuery(SIMPLE_CASES_QUERY)
const caseList = useResult(result, [])

const regex = ref('')
const flags = ref(['g'])
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
  // @ts-ignore
  paper = Raphael('regex-image', 0, 0)

  codeMirrorEditorRef.value.updateHighlightRange()
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

  codeMirrorEditorRef.value.updateHighlightRange()
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

const randomExp = ref('')
watch(regex, () => generateRandomExp())

function matchFn(text: string): RegExpMatchArray[] {
  if (!text || text.length === 0 || regex.value.length === 0) {
    return []
  }

  let regExp: RegExp = new RegExp(regex.value, viewFlags.value)

  if (viewFlags.value.includes('g')) {
    return Array.from(text.matchAll(regExp))
  }
  return [regExp.exec(text) as RegExpMatchArray]
}

function docChanged() {
  nextTick(() => {
    codeMirrorEditorRef.value.updateHighlightRange()
  })
}

function updateAllStatus() {
  changeHeightLight()
  docChanged()
}

function saveCase() {
  console.log('保存')
}
function deleteCase() {
  console.log('删除')
}

/**
 * 随机生成正则表达式用例
 */
const generateRandomExp = () => (randomExp.value = RandExp.randexp(regex.value))
</script>

<template>
  <n-grid cols="1 800:3" x-gap="16" y-gap="16" item-responsive>
    <n-gi span="1 800:2">
      <n-space vertical>
        <n-input
          placeholder="请输入正则表达式"
          class="text-left"
          @input="changeHeightLight"
          maxlength="1000"
          v-model:value="regex"
        >
          <template #prefix>/</template>
          <template #suffix>
            <span>/</span>
            <n-popselect v-model:value="flags" multiple :options="flagOptions" @update:value="updateAllStatus">
              <div class="flex items-center">
                <span id="flags" class="mx-1 cursor-pointer">{{ viewFlags }}</span>
                <n-icon class="cursor-pointer" :component="FlagIcon" />
              </div>
            </n-popselect>
          </template>
        </n-input>

        <div class="text-left mt-1 select-none">Test String</div>
        <CodeMirrorEditor
          ref="codeMirrorEditorRef"
          :matchFn="matchFn"
          :regExpFlags="viewFlags"
          @docChanged="docChanged"
        />

        <div id="regex-image" v-show="isValidRegex"></div>
        <div v-if="canModify" class="text-right mt-1">
          <n-tag @click="saveCase" class="cursor-pointer mr-1" type="success">保存</n-tag>
          <n-tag @click="deleteCase" class="cursor-pointer ml-1" type="error">删除</n-tag>
        </div>
      </n-space>
    </n-gi>
    <n-gi>
      <n-space vertical>
        <n-card v-if="isValidRegex" title="匹配串生成器" class="bg-opacity-50" embedded>
          <template #default>
            <div class="overflow-auto">
              {{ randomExp }}
            </div>
          </template>
          <template #action>
            <n-button @click="generateRandomExp" class="w-full text-white" type="success" strong secondary>
              重新生成
            </n-button>
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
