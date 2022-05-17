<script setup lang="ts">
import { EditorState, Extension, StateEffect, StateField, Transaction } from '@codemirror/state'
import {
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
  highlightActiveLine,
  Decoration,
  DecorationSet,
} from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { RangeSet, RangeSetBuilder } from '@codemirror/rangeset'
import DocSizePlugin from './codemirror/DocSizePlugin'
import { UnderlineKeymapPlugin } from './codemirror/UnderlineSelection'

const props = defineProps(['matchFn', 'regExpFlags', 'doc'])
const emit = defineEmits(['docChanged'])

const data: { view?: EditorView } = reactive({
  view: undefined,
})

// 暗色主题
const darkTheme: Extension = EditorView.theme({}, { dark: true })
const highlightMark: Decoration = Decoration.mark({ class: 'cm-searchMatch' })

const addHighlight = StateEffect.define<{ from: number; to: number }>()
const highlightField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(marks: DecorationSet, tr: Transaction) {
    if (
      // @ts-ignore
      tr.annotations.length === 2 &&
      // @ts-ignore
      tr.annotations.findIndex((annotation) => ['select.pointer'].includes(annotation.value)) !== -1
    ) {
      return marks
    }

    marks = RangeSet.empty //marks.map(tr.changes)
    let empty = true
    tr.effects.forEach((effect) => {
      if (effect.is(addHighlight)) {
        marks = marks.update({
          filter: (from, to, _) => from !== effect.value.from && to !== effect.value.to,
          add: [highlightMark.range(effect.value.from, effect.value.to)],
        })
        empty = false
      }
    })
    return empty ? RangeSet.empty : marks
  },
  provide: (field) => EditorView.decorations.from(field),
})
const RegExpHighlightPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet = Decoration.none

    constructor(view: EditorView) {
      this.buildRegExpDecoration(view)
    }

    update(update: ViewUpdate) {
      const { docChanged, view } = update
      if (docChanged) {
        this.buildRegExpDecoration(view)
      }
    }

    buildRegExpDecoration(view: EditorView) {
      let builder = new RangeSetBuilder<Decoration>()
      let viewportLines = 'm'.includes(props.regExpFlags) ? view.viewportLineBlocks : [view.viewportLineBlocks[0]]
      viewportLines.forEach((line) => {
        let lineObj = view.state.doc.lineAt(line.from)
        try {
          let matches: RegExpMatchArray[] = props.matchFn(lineObj.text)
          matches.forEach((match) => {
            if (match && match[0]) {
              let startIndex = match.index || 0
              let endIndex = startIndex + match[0].length
              builder.add(line.from + startIndex, line.from + endIndex, highlightMark)
            }
          })
        } catch (e) {
          // ignore
        }
      })

      this.decorations = builder.finish()
    }
  },
  { decorations: (v) => v.decorations }
)

// 创建编辑器初始状态
const startState: EditorState = EditorState.create({
  doc: props.doc || 'Hello World',
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    highlightActiveLineGutter(),
    darkTheme,
    DocSizePlugin,
    highlightActiveLine(),
    defaultHighlightStyle,
    UnderlineKeymapPlugin,
    EditorView.baseTheme({
      '.cm-searchMatch': { backgroundColor: 'green' },
    }),
    EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        emit('docChanged', update.state.doc)
      }
    }),
  ],
})

onMounted(() => {
  data.view = new EditorView({
    state: startState,
    parent: document.querySelector('#editor') as Element,
  })
})

function updateHighlightRange(view: EditorView = data.view as EditorView) {
  let viewportLines = props.regExpFlags.includes('m') ? view.viewportLineBlocks : [view.viewportLineBlocks[0]]

  const effects: any = []
  viewportLines.forEach((line) => {
    let lineObj = view.state.doc.lineAt(line.from)

    try {
      let matches: RegExpMatchArray[] = props.matchFn(lineObj.text)
      matches.forEach((match) => {
        if (match && match[0]) {
          let startIndex = match.index || 0
          let endIndex = startIndex + match[0].length
          effects.push(addHighlight.of({ from: line.from + startIndex, to: line.from + endIndex }))
        }
      })
    } catch (e) {
      // ignore
    }
  })
  if (!view.state.field(highlightField, false)) {
    effects.push(StateEffect.appendConfig.of([highlightField]))
  }

  view.dispatch({ effects })
}

defineExpose({
  updateHighlightRange,
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
