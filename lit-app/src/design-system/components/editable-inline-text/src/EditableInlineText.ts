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

  /**
   * readOnly = true && editMode = 'edit' => input disabled
   * * readOnly = true && editMode = 'display' => span with doubleClick disabled
   */
  @property({ attribute: 'read-only' })
  readOnly: boolean = false;

  /**
   * Use custom property accessor to fire an event when changing the value
   */
  private _editMode: EditMode = 'display';

  @property({ attribute: 'edit-mode' })
  get editMode(): EditMode {
    return this._editMode;
  }

  set editMode(value: EditMode) {
    const oldValue = this._editMode;

    const event = new CustomEvent('editModeChanged', {
      detail: {
        editMode: value,
      },
    });

    this._editMode = value;
    if (value !== oldValue) {
      this.dispatchEvent(event);
    }
    this.requestUpdate('editMode', oldValue);
  }

  /**
   * Handler of the input text value change event
   *
   * @param e HTMLInputElement event with the value to be assigned to the text property
   */
  onTextInputChange(e: Event): void {
    if (this.readOnly) {
      return;
    }
    const element = e.target as HTMLInputElement;
    this.text = element.value;
  }

  /**
   * Handler of the Enter Key pressed
   * @param e KeyboardEvent to check the key pressed
   */
  onEnterKeyPressed(e: KeyboardEvent) {
    if (e.key.toUpperCase() === 'ENTER') {
      this.editMode = 'display';
    }
  }

  /**
   * Handler of double clicking the span element
   * and toggling to edit mode
   */
  onSpanDoubleClicked() {
    if (!this.readOnly) {
      this.editMode = 'edit';
    }
  }

  render() {
    if (this.editMode === 'display') {
      return html`<span @dblclick=${this.onSpanDoubleClicked}
        >${this.text}</span
      >`;
    }

    return html`<input
      ?disabled=${this.readOnly}
      type="text"
      aria-label="edit value"
      .value=${this.text}
      @change=${this.onTextInputChange}
      @keyup=${this.onEnterKeyPressed}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-inline-text': EditableInlineText;
  }
}
