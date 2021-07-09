import { LitElement, html, customElement } from 'lit-element';

/**
 * @slot content of the title
 */
@customElement('h1-title')
export class H1Title extends LitElement {
  render() {
    return html`<h1><slot></slot></h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'h1-title': H1Title;
  }
}
