import { html, customElement, property, query } from 'lit-element';
import { TextDecoration } from '../../common-types/text';
import { EditableInlineText } from '../../editable-inline-text';

/**
 * Events:
 * @checkToggled: when the item has been checked
 */
@customElement('editable-check')
export class EditableCheck extends EditableInlineText {
  /**
   * When the input is checked, fire and event
   */
  private _checked!: Boolean;

  @property({ attribute: 'checked', type: Boolean })
  set checked(value) {
    const oldValue = Boolean(this._checked);
    const newValue = Boolean(value);

    this._checked = newValue;

    if (newValue) {
      this._inputCheck?.setAttribute('checked', '');
    } else {
      this._inputCheck?.removeAttribute('checked');
    }

    const event = new CustomEvent('checkToggled', {
      detail: {
        checked: newValue,
      },
    });

    if (newValue !== oldValue) {
      this.dispatchEvent(event);
    }

    this.requestUpdate('checked', oldValue);
  }

  get checked() {
    return this._checked;
  }

  @query('input')
  _inputCheck!: HTMLInputElement;

  render() {
    let computedEditMode = this.editMode;
    let computedTextDecoration: TextDecoration = '';
    if (this.checked) {
      computedEditMode = 'readOnlyDisplay';
      computedTextDecoration = 'line-through';
    }

    return html`<input
        type="checkbox"
        ?disabled=${this.isReadOnly()}
        aria-label="click to mark the item"
        @click=${() => {
          this.checked = !this.checked;
        }}
      /><editable-inline-text
        text=${this.text}
        edit-mode=${computedEditMode}
        text-decoration=${computedTextDecoration}
      ></editable-inline-text>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-check': EditableCheck;
  }
}
