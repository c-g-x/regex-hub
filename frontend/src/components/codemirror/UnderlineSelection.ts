import { EditorView, Decoration, DecorationSet } from '@codemirror/view'
import { StateField, StateEffect, StateEffectType } from '@codemirror/state'
import { keymap } from '@codemirror/view'

const addUnderline: StateEffectType<{ from: number; to: number }> = StateEffect.define<{ from: number; to: number }>()

const underlineField: StateField<DecorationSet> = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(underlines, tr) {
    console.log(underlines)
    underlines = underlines.map(tr.changes)
    for (let e of tr.effects)
      if (e.is(addUnderline)) {
        underlines = underlines.update({
          add: [underlineMark.range(e.value.from, e.value.to)],
        })
      }
    return underlines
  },
  provide: (f) => EditorView.decorations.from(f),
})

const underlineMark = Decoration.mark({ class: 'cm-underline' })

const underlineTheme = EditorView.baseTheme({
  '.cm-underline': { textDecoration: 'underline 2px rgba(255, 0, 0, 0.9)' },
})

export function underlineSelection(view: EditorView) {
  let effects: StateEffect<unknown>[] = view.state.selection.ranges
    .filter((r) => !r.empty)
    .map(({ from, to }) => addUnderline.of({ from, to }))
  if (!effects.length) {
    return false
  }

  if (!view.state.field(underlineField, false)) {
    effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]))
  }
  view.dispatch({ effects })
  return true
}

export const UnderlineKeymapPlugin = keymap.of([
  {
    key: 'Mod-u',
    preventDefault: true,
    run: underlineSelection,
  },
])
