import { LitElement, html, customElement, css } from 'lit-element';
import { designSystem } from '../../../style';

@customElement('button-primary')
export class ButtonPrimary extends LitElement {
  static get styles() {
    return [
      designSystem,
      css`
        :host button {
          border: 0;
          background-color: rgb(239, 68, 68);
          color: white;
          border: 1px solid rgb(220, 38, 38);
          padding: 0.5rem;
          font-size: 16px;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        :host button:hover {
          --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
            var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
        :host button:active {
          color: yellow;
        }
      `,
    ];
  }

  render() {
    return html`<button><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'button-primary': ButtonPrimary;
  }
}
