import { LitElement, html, customElement, property } from 'lit-element';

/**
 * Types of component display:
 * - edit: an input is presented to receive user input text
 * - display: an span is presented to display the text property
 */
export type EditMode = 'edit' | 'display';

/**
 * @slot title text
 */
@customElement('editable-inline-text')
export class EditableInlineText extends LitElement {
  @property({ reflect: true })
  text: String = '';

  @property({ attribute: 'read-only' })
  readOnly: boolean = false;

  @property({ attribute: 'edit-mode' })
  editMode: EditMode = 'display';

  onTextInputChange(e: Event) {
    if (this.readOnly) {
      return;
    }
    const element = e.target as HTMLInputElement;
    this.text = element.value;
  }

  render() {
    if (this.editMode === 'display') {
      return html`<span>${this.text}</span>`;
    }

    return html`<input
      ?disabled=${this.readOnly}
      type="text"
      aria-label="edit value"
      .value=${this.text}
      @change=${this.onTextInputChange}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-inline-text': EditableInlineText;
  }
}
