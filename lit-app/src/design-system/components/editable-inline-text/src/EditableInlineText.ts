import { LitElement, html, customElement } from 'lit-element';

/**
 * @slot title text
 */
@customElement('editable-inline-text')
export class EditableInlineText extends LitElement {
  render() {
    return html`<span><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-inline-text': EditableInlineText;
  }
}
