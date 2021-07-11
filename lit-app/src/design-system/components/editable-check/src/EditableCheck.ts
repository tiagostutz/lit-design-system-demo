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

    this.requestUpdate('checked', oldValue).then(() => {
      if (newValue !== oldValue) {
        const event = new CustomEvent('checkToggled', {
          detail: {
            checked: newValue,
          },
        });
        this.dispatchEvent(event);
      }
    });
  }

  get checked() {
    return this._checked;
  }

  @query('input')
  _inputCheck!: HTMLInputElement;

  editModeChanged(e: any) {
    if (
      e.detail.newValue === 'display' &&
      e.detail.oldValue !== 'readOnlyDisplay'
    ) {
      // if the editMode changed to `display`, then that's a confirmation of a text typed
      // so, fire an event of this update
      const event = new CustomEvent('textChanged', {
        detail: {
          text: e.target.text,
        },
      });

      this.dispatchEvent(event);
    }
  }

  render() {
    let computedEditMode = this.editMode;
    let computedTextDecoration: TextDecoration = '';
    if (this.checked) {
      computedEditMode = 'readOnlyDisplay';
      computedTextDecoration = 'line-through';

      // needs improvement: currently didn't find a better way to render the "checked" attribute
      return html`<input
          type="checkbox"
          ?disabled=${this.isReadOnly()}
          checked="checked"
          aria-label="click to mark the item"
          @click=${() => {
            this.checked = !this._checked;
          }}
        /><editable-inline-text
          text=${this.text}
          edit-mode=${computedEditMode}
          text-decoration=${computedTextDecoration}
          @editModeChanged=${this.editModeChanged}
        ></editable-inline-text>`;
    }

    // This is not good, because is duplicating, but didn't found yet
    // a good way to handle the "checked" attribute dynamically
    return html`<input
        type="checkbox"
        ?disabled=${this.isReadOnly()}
        aria-label="click to mark the item"
        @click=${() => {
          this.checked = !this._checked;
        }}
      /><editable-inline-text
        text=${this.text}
        edit-mode=${computedEditMode}
        text-decoration=${computedTextDecoration}
        @editModeChanged=${this.editModeChanged}
      ></editable-inline-text>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-check': EditableCheck;
  }
}
