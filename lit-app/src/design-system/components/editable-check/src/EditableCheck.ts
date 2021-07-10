import { html, customElement } from 'lit-element';
import { EditableInlineText } from '../../editable-inline-text';

@customElement('editable-check')
export class EditableCheck extends EditableInlineText {
  render() {
    return html`<input
        type="checkbox"
        ?disabled=${this.isReadOnly()}
        aria-label="click to mark the item"
      /><editable-inline-text text=${this.text}></editable-inline-text>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-check': EditableCheck;
  }
}
