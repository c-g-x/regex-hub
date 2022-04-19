import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";

// 显示文档大小插件
export default ViewPlugin.fromClass(
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
