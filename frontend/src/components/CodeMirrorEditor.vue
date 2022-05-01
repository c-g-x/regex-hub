<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, ViewPlugin, ViewUpdate, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { HighlightStyle, defaultHighlightStyle, Tag } from '@codemirror/highlight'
import DocSizePlugin from './codemirror/DocSizePlugin'
import { UnderlineKeymapPlugin } from './codemirror/UnderlineSelection'

const props = defineProps(['matchFn'])
const emit = defineEmits(['docChanged'])

const DarkHighlightStyle = HighlightStyle.define([], {
  themeType: 'dark',
})
// DarkHighlightStyle.match(Tag.define(), null)
const data: { view?: EditorView } = reactive({
  view: undefined,
})

// 暗色主题
const darkTheme = EditorView.theme({}, { dark: true })

// 监听 doc 变化的插件
const domChangeUpdaterPlugin = ViewPlugin.fromClass(
  class {
    constructor(view: EditorView) {}

    update(update: ViewUpdate) {
      const { docChanged, state } = update
      if (update.docChanged) {
        console.log(state)
        emit('docChanged')
        updateHighlightRange()
        props.matchFn()
      }
    }
  }
)

// 创建编辑器初始状态
const startState: EditorState = EditorState.create({
  doc: 'Hello World',
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    highlightActiveLineGutter(),
    domChangeUpdaterPlugin,
    darkTheme,
    DocSizePlugin,
    highlightActiveLine(),
    defaultHighlightStyle,
    UnderlineKeymapPlugin,
  ],
})

onMounted(() => {
  data.view = new EditorView({
    state: startState,
    parent: document.querySelector('#editor') as Element,
  })
})

function updateHighlightRange() {
  console.log('updateHighlightRange')
  // data.view.dispatch()
}

defineExpose({
  updateHighlightRange
})
</script>

<template>
  <div id="editor" class="editor-container" />
</template>

<style>
.editor-container {
  @apply text-left rounded-md overflow-hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}
</style>
