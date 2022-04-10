<script setup>
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'

let startState = EditorState.create({
  doc: 'Hello World',
  extensions: [keymap.of(defaultKeymap), lineNumbers()],
})
EditorView.baseTheme({
  '.cm-gutters': {
    backgroundColor: '#2c3e50',
      color: '#2c3e50'
  },
})

const view = ref({})
onMounted(() => {
  console.log(document.querySelector('#editor'))
  view.value = new EditorView({
    state: startState,
    parent: document.querySelector('#editor'),
  })
})
</script>

<template>
  <div id="editor" class="text-left border m-2" />
</template>

<style>
.dark-gutter {
  background: #2c3e50;
}
</style>
