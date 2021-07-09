import { LitElement, html, customElement } from 'lit-element';

/**
 * @slot content of the title
 */
@customElement('main-container')
export class MainContainer extends LitElement {
  render() {
    return html`<div><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-container': MainContainer;
  }
}
