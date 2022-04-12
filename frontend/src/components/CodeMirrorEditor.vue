<template>
  <div id="editor" class="text-left border rounded-md overflow-hidden" />
</template>

<script setup>
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'

let startState = EditorState.create({
  doc: 'Hello World',
  extensions: [keymap.of(defaultKeymap), lineNumbers()],
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

<style>
</style>
