import { LitElement, html, customElement, property } from 'lit-element';
import { designSystem } from '../../../style';
import { TextDecoration } from '../../common-types/text';

/**
 * Types of component display:
 * - edit: input[text] visible and enabled
 * - display: span visible and handle double-click to presente input text to edit text
 * - readOnlyEdit: input[text] visible but disabled
 * - readOnlyDisplay: span visible but with doubleClick to edit disabled
 */
export type EditMode = 'edit' | 'display' | 'readOnlyEdit' | 'readOnlyDisplay';

@customElement('editable-inline-text')
export class EditableInlineText extends LitElement {
  static get styles() {
    return [designSystem];
  }

  @property({ attribute: 'text-decoration' })
  textDecoration: TextDecoration = '';

  @property({ reflect: true })
  text: String = '';

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

  isReadOnly() {
    return (
      this.editMode === 'readOnlyDisplay' || this.editMode === 'readOnlyEdit'
    );
  }

  /**
   * Handler of the input text value change event
   *
   * @param e HTMLInputElement event with the value to be assigned to the text property
   */
  onTextInputChange(e: Event): void {
    if (this.isReadOnly()) {
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
    if (!this.isReadOnly()) {
      this.editMode = 'edit';
    }
  }

  render() {
    if (this.editMode === 'display') {
      return html`<span
        @dblclick=${this.onSpanDoubleClicked}
        class=${this.textDecoration}
        >${this.text}</span
      >`;
    }

    // readOnlyDisplay: double click disabled
    if (this.editMode === 'readOnlyDisplay') {
      return html`<span class=${this.textDecoration}>${this.text}</span>`;
    }

    return html`<input
      ?disabled=${this.isReadOnly()}
      type="text"
      aria-label="type the text value"
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
