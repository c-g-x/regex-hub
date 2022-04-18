<template>
  <div id="editor" class="editor-container" />
</template>

<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'
import { Ref } from 'vue'

const data: { view?: EditorView } = reactive({
  view: undefined,
})

// 暗色主题
const darkTheme = EditorView.theme({}, { dark: true })

// 显示文档大小插件
const docSizePlugin = ViewPlugin.fromClass(
  class {
    private dom: any
    constructor(view: EditorView) {
      this.dom = view.dom.appendChild(document.createElement('div'))
      this.dom.style.cssText = 'position: absolute; inset-block-end: 4px; inset-inline-end: 5px;'
      this.dom.textContent = 'total: ' + view.state.doc.length
    }

    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.dom.textContent = 'total: ' + update.state.doc.length
      }
    }

    destroy() {
      this.dom.remove()
    }
  }
)

// 监听 doc 变化的插件
const domChangeUpdaterPlugin = ViewPlugin.fromClass(
  class {
    constructor(view: EditorView) {}

    update(update: ViewUpdate) {
      const { docChanged, state } = update
      if (update.docChanged) {
        console.log(state)
      }
    }
  }
)

// 创建编辑器初始状态
const startState: EditorState = EditorState.create({
  doc: 'Hello World',
  extensions: [keymap.of(defaultKeymap), lineNumbers(), domChangeUpdaterPlugin, darkTheme, docSizePlugin],
})

const view: Ref = ref({})
onMounted(() => {
  data.view = new EditorView({
    state: startState,
    parent: document.querySelector('#editor') as Element,
  })
})
</script>

<style>
.editor-container {
  @apply text-left rounded-md overflow-hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}
</style>
