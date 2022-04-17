<template>
  <div id="editor" class="text-left border rounded-md overflow-hidden" />
</template>

<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'

let startState = EditorState.create({
  doc: 'Hello World',
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    ViewPlugin.fromClass(
      class {
        constructor(view: EditorView) {}

        update(update: ViewUpdate) {
          const { docChanged, state } = update
          if (update.docChanged) {
            console.log(state)
          }
        }
      }
    ),
  ],
})

const view = ref({})
EditorView.theme({}, { dark: true })
onMounted(() => {
  view.value = new EditorView({
    state: startState,
    parent: document.querySelector('#editor') as Element,
  })
})
</script>

<style>
.ͼ2 .cm-content {
  caret-color: rgba(255, 255, 255, 0.8) !important;
}
</style>
